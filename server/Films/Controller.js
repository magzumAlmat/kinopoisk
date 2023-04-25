const Film=require('./Film')
const createFilm=async(req,res) => {
    console.log('req.user._id= ',req.user._id)
    // console.log('req.body=== ',req)
    // console.log('req.body=== ',req.body.titleRus)
    // console.log('req.body=== ',req.body.titleEng)
    // console.log('req.body=== ',req.body.year)
    // console.log('req.body=== ',req.body.time)
    // console.log('req.body=== ',req.body.country)
    // console.log('req.body=== ',req.body.ganre)
    if (req.body.image &&
        req.body.titleRus.length>2 && 
        req.body.titleEng.length>2 && 
        req.body.year.length>0 && 
        req.body.time.length>0 && 
        req.body.country.length>2 && 
        req.body.ganre.length>2)
    {

        console.log(' if idet po vetke true ')
        await new Film({
            author:req.user._id,
            titleRus:req.body.titleRus,
            titleEng:req.body.titleEng,
            year:req.body.year,
            time:req.body.time,
            country:req.body.country,
            ganre:req.body.ganre,
            image:req.body.image,
            
            // image:`${req.file.destination}/${req.file.filename}`,
        }).save()

        res.redirect(`/admin/${req.user._id}`)
    }else
    {
        res.redirect('/new&error=1')
    }

}
module.exports={createFilm}