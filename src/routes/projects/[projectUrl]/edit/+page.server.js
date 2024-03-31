import { DB_URL } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load ({ locals, fetch, params}) {
  
    let filesData = []
    let imagesData = []
    let glbData = []
    const fetchFile = async (url) => {
      const res = await fetch(url)
      const data = res.text()
      return data
    }

    const project = await locals.pb.collection('userProjects').getOne(params.projectUrl, { requestKey: null })

    const getProjectFiles = async (id) => { 
      try{


        for (let file of project.files){
          let url = `${DB_URL}/api/files/userProjects/${params.projectUrl}/${file}`
          await fetchFile(url).then(result => {filesData.push(
            {
              fileName: file.split('_')[0] + '.' + file.split('.')[1],
              fileFullName: file,
              filePath: `/api/assets/${params.projectUrl}/${file}`,
              fileData: result
            }
            )
          }
          )
        }

        for (let imageFile of project.imageFiles){
          let url = `${DB_URL}/api/files/userProjects/${params.projectUrl}/${imageFile}`
          await fetchFile(url).then(result => {imagesData.push(
            {
              imageFileName: imageFile.split('_')[0] + '.' + imageFile.split('.')[1],
              imageFileFullName: imageFile,
              imageFilePath: `/api/assets/${params.projectUrl}/${imageFile}`,
              //imageFileData: result
            }
            );
            //console.log(result.headers.get('content-length'))
          }
          )
        }
        // console.log('imagesData ' + imagesData)

        for (let glbFile of project.glbFiles){
          let url = `${DB_URL}/api/files/userProjects/${params.projectUrl}/${glbFile}`
          await fetchFile(url).then(result => {glbData.push(
            {
              glbFileName: glbFile.split('_')[0] + '.' + glbFile.split('.')[1],
              glbFileFullName: glbFile,
              glbFilePath: `/api/assets/${params.projectUrl}/${glbFile}`,
              //glbFileData: result
            }
            )
          }
          )
        }
        // console.log('glbData ' + glbData)

        // console.log(serializeNonPOJOs(project))
        
        return serializeNonPOJOs(project)

      } catch (err){
        console.log(err)
        throw error(err.status, err.message);
      }
    }

    // const projectObject = getProjectFiles(params.projectUrl)

      return {
        project: await getProjectFiles(params.projectUrl),
        type: 'project',
        files: filesData,
        imageFiles: imagesData,
        glbFiles:glbData
      }
  
  }

  export const actions = {
    saveProject: async ({locals, params, request}) => {
      const form = await request.formData()
      const body = Object.fromEntries(form)
      const bodyKeysArray = Object.keys(body)
      const bodyValuesArray = Object.values(body)

      // console.log(form, body)

      const formFieldsNumber = bodyKeysArray.length

      const formData = new FormData();
      formData.append('name', body.projectName);

      for(let i=1; i<formFieldsNumber; i++){
        if(bodyKeysArray[i] != 'projectName'){
          const fileName = bodyKeysArray[i]
          const fileType = fileName.split('.')[1]
          const fileData = bodyValuesArray[i]
          // console.log(fileName + ' ' + fileData)
          const newFile = new File([fileData], fileName, {
            type: "text/plain",
          });
          formData.append('files', newFile);
        }
      }

      let record
      try {
        await locals.pb.collection('userProjects').update(params.projectUrl, {
          'files': null,
        });

        // console.log('final form: ' + formData)

        record = await locals.pb.collection('userProjects').update(params.projectUrl, formData)
      } catch (err) {
        console.log('Error: ', err)
        throw error(500, 'Something went wrong')
      }

      throw redirect(303, `/projects/${record.id}/edit`)
    },

    uploadFile: async ({locals, params, request}) => {
      const form = await request.formData()
      const asset = form.get('asset')
      // console.log('uploading this asset: ' + asset)

      

      // console.log(asset)
      let record
      try {
        if(asset){
          
          if(asset.type === 'image/jpeg' || asset.type === 'image/png' || asset.type === 'image/webp'){
            const formData = new FormData()
            formData.append('imageFiles', asset)
            // console.log(asset)
            record = await locals.pb.collection('userProjects').update(params.projectUrl, formData)
            // console.log(record)
          }

          if(asset.type === 'application/octet-stream'){
            const formData = new FormData()
            formData.append('glbFiles', asset)
            // console.log(asset)
            record = await locals.pb.collection('userProjects').update(params.projectUrl, formData)
            // console.log(record)
          }
        }
      } catch (err) {
        console.log('Error: ', err)
        throw error(500, 'Something went wrong')
      }

      //throw redirect(303, `/projects/${record.id}/edit`)
    },

    deleteFile: async ({locals, params, request}) => {
      const form = await request.formData()
      const body = Object.fromEntries(form)
      const fileFullName = body.fileFullName

      // console.log(form)

      try {
          // const result = await locals.pb.collection('userProjects').delete(projectId)                
          if(body.fileType === 'png' || body.fileType === 'jpg' || body.fileType === 'webp' || body.fileType === 'gif'){
            const record = await locals.pb.collection('userProjects').update(params.projectUrl, {
            'imageFiles-': fileFullName,
            })
          }
          if(body.fileType === 'glb'){
            const record = await locals.pb.collection('userProjects').update(params.projectUrl, {
            'glbFiles-': fileFullName,
            })
          }
      } catch (err){
          console.log(err)
          throw error(err.status, err.message);
      }  
    }
  }