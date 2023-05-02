const Film=require('./Film')
const fs=require('fs')
const path=require('path')

const createFilm=async(req,res) => {
  
    
    if (
        // req.file.length > 2 &&
        req.body.titleRus.length>2 && 
        req.body.titleEng.length>2 && 
        req.body.year.length>0 && 
        req.body.time.length>0 && 
        req.body.country.length>2 && 
        req.body.ganre.length>2)
    {
        console.log(' if idet po vetke true ', req.file)
        await new Film({
            titleRus:req.body.titleRus,
            titleEng:req.body.titleEng,
            year:req.body.year,
            time:req.body.time,
            country:req.body.country,
            ganre:req.body.ganre,
            image:`/images/films/${req.file.filename}`,
            author:req.user._id,
            // image:`${req.file.destination}/${req.file.filename}`,
        }).save()

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
        req.body.ganre.length>0 )
        {
             console.log('req.file = ',req.file)
            console.log('req.user._id= ',req.user._id)
            console.log('req.body=== ',req.body)
       

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

module.exports={createFilm,editFilm,deleteFilm}