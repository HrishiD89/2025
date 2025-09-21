import Course from "../models/Course.js";

export const getAllCourses = async (request,response) =>{
    try{
        const courses = await Course.find(); 
        response.status(200).json({
            message : "Courses Fetched Successfully!",
            courses
        });
    }catch(err){
        response.status(500).json({message : err.message});
    }
}

export const applyCourse = async (request,response) => {
    const {id} = request.params;
    try{
        const course = await Course.findById(id);
        if(course){
            course.isApplied = true;
            await course.save();
            response.status(200).json({
                message : "Applied Successfully!",
                course
            });
        }else{
            response.status(404).json({message : "Course Not Found!"});
        }
    }catch(err){
        response.status(500).json({message : err.message});
    }
}

export const dropCourse = async (request,response) => {
    const {id} = request.params;
    try{
        const course = await Course.findById(id);
        if(course){
            course.isApplied = false;
            course.isRated = false;
            await course.save();
            response.status(200).json({
                message : "Dropped Successfully!",
                course
            });
        }else{
            response.status(404).json({message : "Course Not Found!"});
        }
    }catch(err){
        response.status(500).json({message : err.message});
    }
}

export const rateCourse = async (request,response) => {
    const {id} = request.params;
    const {rating} = request.body;

    try{
        const course = await Course.findById(id);
        if(!course){
            return response.status(404).json({message : "Course Not Found!"});
        }
        if(!course.isApplied){
            return response.status(400).json({message : "You need to apply the course first!"});
        }
        if(!course.isRated){
            const newNoOfRatings = course.noOfRatings + 1;
            const totalRating = Math.round((((course.rating * course.noOfRatings) + rating)/ newNoOfRatings) * 10) / 10;

            course.noOfRatings = newNoOfRatings;
            course.rating = totalRating;
            course.isRated = true;
            await course.save();
            response.status(200).json({
                message : "Rated Successfully!",
                course
            });
        }

        response.status(400).json({message : "You have already rated the course!"});
    }catch(err){
        response.status(400).json({message : err.message});
    }
}
