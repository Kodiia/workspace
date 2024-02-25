import { DB_URL } from '$env/static/private'
import { error } from '@sveltejs/kit';
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
        tutorial: getProjectFiles(params.projectUrl),
        type: 'project',
        files: filesData
      }
  
  }