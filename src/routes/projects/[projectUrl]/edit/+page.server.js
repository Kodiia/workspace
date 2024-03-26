import { DB_URL } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load ({ locals, fetch, params}) {
  
    let filesData = []
    const fetchFile = async (url) => {
      const res = await fetch(url)
      const data = res.text()
      return data
    }

    const getProjectFiles = async (id) => { 
      try{
        const project = await locals.pb.collection('userProjects').getOne(id, { requestKey: null })

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
        
        return serializeNonPOJOs(project)

      } catch (err){
        console.log(err)
        throw error(err.status, err.message);
      }
    }


      return {
        project: getProjectFiles(params.projectUrl),
        type: 'project',
        files: filesData
      }
  
  }

  export const actions = {
    saveProject: async ({locals, params, request}) => {
      const form = await request.formData()
      const body = Object.fromEntries(form)
      const bodyKeysArray = Object.keys(body)
      const bodyValuesArray = Object.values(body)

      console.log(form, body)

      const formFieldsNumber = bodyKeysArray.length

      const formData = new FormData();
      formData.append('name', body.projectName);

      for(let i=1; i<formFieldsNumber; i++){
        if(bodyKeysArray[i] != 'projectName'){
          const fileName = bodyKeysArray[i]
          const fileType = fileName.split('.')[1]
          console.log(fileType)
          // const fileData = bodyValuesArray[i]
          // const newFile = new File([fileData], fileName, {
          //   type: fileType === 'jpeg' ? 'image/jpeg' : 'text/plain',
          // });
          // formData.append('files', newFile);
          if(fileType != 'jpeg'){
            const fileData = bodyValuesArray[i]
            const newFile = new File([fileData], fileName, {
              type: "text/plain",
            });
            formData.append('files', newFile);
            console.log(formData)
          }
          if(fileType === 'asset'){
            // const asset = form.get('asset')
            // console.log('hello', asset)
            // formData.append('files', asset.files[0]);

            const fileData = bodyValuesArray[i]
            console.log(fileData)
            const newFile = new File([fileData], fileName, {
              type: "image/jpeg",
            });
            formData.append('files', newFile);
          }
        
        }
      }

      let record
      try {
        await locals.pb.collection('userProjects').update(params.projectUrl, {
          'files': null,
        });

        record = await locals.pb.collection('userProjects').update(params.projectUrl, formData)
      } catch (err) {
        console.log('Error: ', err)
        throw error(500, 'Something went wrong')
      }

      throw redirect(303, `/projects/${record.id}/edit`)
    }
  }