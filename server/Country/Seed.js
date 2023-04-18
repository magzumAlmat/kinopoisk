const Country = require("./Country")


const data=[
    'Россия',
    'СССР',
    'Франция',
    "Южная Корея",
    "Великобритания",
    'Япония',
    "Италия",
    "Испания",
    "Германия",
    "США",
    "Турция",
    "Дания",
    "Норвегия",
    "Гонгконг",
]

 async function writeDataCountry(){
    const length= await Country.count()
    if (length==0){
        data.map((item,index)=>{
            new Country({
                name:item,
                key:index
            }).save()
        })
    }
}
module.exports = writeDataCountry