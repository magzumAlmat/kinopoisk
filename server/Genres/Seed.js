const Genres = require("./Genres")

const data=[
    'Comedy','Catroon','Horror','Triller','Fantasy','Actions','Melodrama','Advanture','Detective'
]

 async function writeDataGenre(){
    const length = await Genres.count()
    if (length==0){
        data.map((item,index)=>{
            new Genres({
                name:item,
                key:index
            }).save()
        })
    }
}
module.exports = writeDataGenre