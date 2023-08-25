import { DB_URL } from '$env/static/private'
import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils';
// const fetch = require('node-fetch')

// let id = ''
// projectId.subscribe(value => {
//   id = value
// })

export async function load ({ locals, fetch, params}) {
    //console.log(params)
    let courseUrl = params.courseUrl

    const getCourseName = async () =>{
      

        try{
            const courseData = await locals.pb.collection('courses').getList(1, 20, { 
                '$autoCancel': false,
                filter: `url = "${courseUrl}"` }
            );
            return serializeNonPOJOs(courseData)
        } catch (err){
            console.log(err)
            throw error(err.status, err.message);
        }
    }

    let course = await getCourseName()
  
    let filesData = []
    let tutorialSteps
    const fetchFile = async (url) => {
      const res = await fetch(url)
      const data = res.text()
      return data
    }

    const getTutorialFiles = async (id) => { 
      try{
        const project = await locals.pb.collection(params.courseUrl).getOne(id)

        for (let file of project.files){
          let url = `${DB_URL}/api/files/${params.courseUrl}/${params.tutorialUrl}/${file}`
          await fetchFile(url).then(result => {filesData.push(
            {
              fileName: file.split('_')[0] + '.' + file.split('.')[1],
              fileData: result
            }
            )
          }
          )
        }

        if(course.items[0].type === 'special'){
          if(typeof locals.user != 'undefined'){
              for(let specialCourse of locals.user.specialCourses.specialCourses){
                console.log(specialCourse, course.url)
                  if(specialCourse === course.url){
                    return serializeNonPOJOs(project)
                  } else {
                      // throw redirect(303, '/')
                      throw error(500, 'Access denied');
                  } 
              }
          }
        } else {
          return serializeNonPOJOs(project)
        }
        

      } catch (err){
        console.log(err)
        throw error(err.status, err.message);
      }
    }

      return {
        tutorial: getTutorialFiles(params.tutorialUrl),
        type: 'tutorial',
        files: filesData,
      }
  
  }