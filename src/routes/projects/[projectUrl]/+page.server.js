import { DB_URL } from '$env/static/private'
import { error, redirect } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';

export async function load ({ locals, fetch, params}) {
    //console.log(params)
    let projectUrl = params.projectUrl

    const getProjectName = async () =>{
      

        try{
            const projectData = await locals.pb.collection('userProjects').getList(1, 20, { 
                '$autoCancel': false,
                //filter: `url = "${projectUrl}"` 
              }
            );
            return serializeNonPOJOs(projectData)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    let projectName = await getProjectName()
  
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
              fileData: result
            }
            )
          }
          )
        }


        // if(course.items[0].type === 'special'){
        //   if(typeof locals.user != 'undefined'){
        //       for(let specialCourse of locals.user.specialCourses.specialCourses){
        //         console.log(specialCourse, course.items[0].url)
        //           if(specialCourse === course.items[0].url){
        //             return serializeNonPOJOs(project)
        //           } 
        //           // else {
        //           //     // throw redirect(303, '/')
        //           //     throw error(500, 'Access denied');
        //           // } 
        //       }
        //   } else {
        //     // throw redirect(303, '/')
        //     throw error(500, 'Access denied');
        //   }
        // } else {
        //   return serializeNonPOJOs(project)
        // }
        
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
    saveProject: async ({locals, request}) => {
      const form = await request.formData()
      const body = Object.fromEntries(form)
      const bodyKeysArray = Object.keys(body)
      const bodyValuesArray = Object.values(body)

      console.log(bodyKeysArray)
      console.log(bodyValuesArray)

      const formFieldsNumber = bodyKeysArray.length

      const formData = new FormData();
      formData.append('name', body.name);

      for(let i=1; i<formFieldsNumber; i++){
        if(bodyKeysArray[i] != 'projectName'){
          const fileName = bodyKeysArray[i]
          const fileData = bodyValuesArray[i].toString()
          const newFile = new File([fileData], fileName, {
            type: "text/plain",
          });
        formData.append('files', newFile);
        }
      }

      let record
      try {
        record = await locals.pb.collection('userProjects').update(formData)
      } catch (err) {
        console.log('Error: ', err)
        throw error(500, 'Something went wrong')
      }

      throw redirect(303, `/projects/${record.id}`)
    }
  }