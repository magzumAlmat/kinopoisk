const Film=require('./Film')
const fs=require('fs')
const path=require('path')
const User =require('../auth/User')

const createFilm=async(req,res) => {
    console.log('req body= ',req.body)
    if (
        // req.file.length > 2 &&
        req.body.titleRus.length>2 && 
        req.body.titleEng.length>2 && 
        req.body.year.length>0 && 
        req.body.time.length>0 && 
        req.body.country.length>2 && 
        req.body.genre.length>2
     
        )
    {
        console.log(' if idet po vetke true ', req.file)
        if(req.body.video && req.body.video.length > 2){
        await new Film({
            titleRus:req.body.titleRus,
            titleEng:req.body.titleEng,
            year:req.body.year,
            time:req.body.time,
            country:req.body.country,
            genre:req.body.genre,
            video:req.body.video,
            image:`/images/films/${req.file.filename}`,
            author:req.user._id,
            // image:`${req.file.destination}/${req.file.filename}`,
        }).save()
        }else if(req.body.series && req.body.series.length > 0){
            await new Film({
                titleRus:req.body.titleRus,
                titleEng:req.body.titleEng,
                year:req.body.year,
                time:req.body.time,
                country:req.body.country,
                genre:req.body.genre,
                series: req.body.series,
                image:`/images/films/${req.file.filename}`,
                author:req.user._id
            }).save()
            }
        res.redirect(`/admin/${req.user._id}`)
    }else
    {
        res.redirect('/new&error=1')
    }
    console.log('req.body.film = ',req.body.film)
}


const editFilm=async(req,res)=>{
    // console.log('IM in edit film req body= ',req.body)
    if (
        // req.file &&
        req.body.titleRus.length>2 && 
        req.body.titleEng.length>2 && 
        req.body.year.length>0 && 
        req.body.time.length>0 && 
        req.body.country.length>2 && 
        req.body.ganre.length>0)
        {
            const films= await Film.findById(req.body.id)
            console.log('films= ',films)
            fs.unlinkSync(path.join(__dirname+'../../../public'+films.image))
            // console.log('PATH= ',__dirname+'../../../public'+films.image)
            films.titleRus=req.body.titleRus,
            films.titleEng=req.body.titleEng,
            films.year=req.body.year,
            films.time =req.body.time,
            films.country =req.body.country,
            films.ganre=req.body.ganre,
            films.video=req.body.video,
            films.series=req.body.series,
            films.image=`/images/films/${req.file.filename}`,
            films.author=req.user._id
            films.save()
            res.redirect('/admin/'+req.user.id)  
        }
    else{
        res.redirect(`/editfilm/${req.body.id}?error=1`)
    }
}



const deleteFilm=async(req,res)=>{
    console.log('DELETE FILM11111')
    const { id } = req.body;

  try {
    await Film.findByIdAndDelete(id);   
    res.redirect('/admin/'+req.user.id)
  } catch (error) {
    res.status(400).json({ error });
  }
}




const saveFilm=async(req,res)=>{
    if(req.user&&req.body.id){
        // console.log(req.user,' -- ',req.body.id)
        const user=await User.findById(req.user.id)
        console.log('this is user=', user)
        const findFilm=user.toWatch.filter(item => item._id == req.body.id)

        if (findFilm.length==0){
            user.toWatch.push(req.body.id);
            user.save()
            res.send('Фильм добавлен!')
        }else{
            res.send('Фильм уже присутствует в списке!')
        }
        
    }
    
    // console.log('in Controller save film function ',req.body)

}




const deleteFromToWatch=async(req,res)=>{
    if(req.user&&req.params.id){
        // console.log(req.user,' -- ',req.body.id)
        const user=await User.findById(req.user.id)
        console.log('req params id= ',req.params.id)
        for(let i=0;i<user.toWatch.length;i++){
            if(user.toWatch[i]==req.params.id){
                user.toWatch.splice(i,1)
                user.save()
                res.send('Successfully deleted')
            }
        }
        // res.send('not found')
    }
    
    // console.log('in Controller save film function ',req.body)

}

module.exports={createFilm,saveFilm,editFilm,deleteFilm,deleteFromToWatch}