#!/usr/bin/env node 
const program = require('commander');
const request = require('request');
const MalApi = require ('mal-api');

var username = "kikuiredkill";
var password = "aqwzsxedc123456789";

const mal = new MalApi ( {    
  username, 
  password,
} )

// Conﬁguration des paramètres attendus 
program  
    .version('1.0.0')  
    .option('-s, --settings', 'configure your acount')
    .option('-al, --animelist [username]', 'Read an anime list')
    .option('-a, --anime [animename]', 'Read an anime\'s details')  
    .option('--as, --animesearch [animename]', 'Verify if anime exist')
    .option('--ml, --mangalist [username]', 'Read a manga list')
    .option('-m, --manga [manganame]', 'Read an manga\'s details')
    .option('--ms, --mangasearch [manganame]', 'Search manga')
    .option('--aa, --addanime [animename]', 'Add anime to anime list')
    .option('--ua, --updateanime [animename]', 'Update an anime on user\'s anime list')
    .option('--da, --deleteanime [animename]', 'Delete an anime from user\'s anime list')
    .option('--am, --addmanga [manganame]', 'Add manga to manga list')
    .option('--um, --updatemanga [manganame]', 'Update a manga on user\'s manga list')
    .option('--dm, --deletemanga [manganame]', 'Delete a manga from user\'s manga list')


program.parse(process.argv) 

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------Liste-des-fonctions
var SearchAnime = async function(name){
    let data
    await mal.anime.searchAnime(name)
        .then(res => {
            //console.log(res);
            data = res;
        })
        .catch(err => console.error(err))
    return data
}

var verifyAuthen = function(){
    mal.account.verifyCredentials()
        .then(res => console.log(res))
        .catch(err => done(err))
}

var searchManga = function(name){
    mal.manga.searchManga(name)
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => console.error(err))
}

var addAnime = function(name, score){
    serchAnime(name).then((anime) => {
        let animeId = anime.id;
        mal.anime.addAnime(animeId, {
            score: score
        });
        console.log(name + " a été ajouter à votre liste !");
    }).catch(err => console.error(err))
}

var addManga = function(name, score){
    serchManga(name).then((manga) => {
        let mangaId = manga.id;
        mal.manga.addManga(mangaId, {
            score: score
        });
        console.log(name + " a été ajouter à votre liste !");
    }).catch(err => console.error(err))
}

//fonction update anime/manga
//fonction delete anime/manga
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------Gestion-des-options

if(program.settings) {
    console.log('settings')
}
else if(program.anime) {
    /*let anime = serchAnime(program.anime);
    console.log("voici les détails de l'anime\n");
    console.log('nom : ${anime.title} \n nombre d\'episode : ${anime.episodes} \n status de l\'anime : ${anime.status} \n start date : ${anime.start_date} \n end date : ${anime.end_date} \n synopsis : ${anime.synopsis}');*/
}
else if(program.animesearch) {
    //console.log('animesearch', program.animesearch)
    //console.log("test", SearchAnime(program.animesearch));
    SearchAnime(program.animesearch).then((animeData) => {
        //console.log(animeData)
        //gérer le tableau d objet
        if(animeData != null)
            console.log(`${program.animesearch} a été trouver dans la BDD !`);
        else
            console.log(`${program.animesearch} n'a pas été trouvé !`)
        for(var item in animeData){
            console.log(item+"\n\n donnée suivante -------------------------------------------------------------------------------------------")
        }
    })
}
else if(program.manga){
    
}
else if(program.mangasearch){
    
}
else if(program.addanime){
    
}
else if(program.addmanga){
    
}
else if(program.updateanime){
    
}
else if(program.updatemanga){
    
}
else if(program.deleteanime){
    
}
else if(program.deletemanga){
    
}
else{
    program.help();
}














    /*let username = program.animelist;
    //console.log(username);
    let url = `http://mal-api.com/animelist/${username}`;

    request(url, function (err, response, body) {
        if(err){
            console.log(err);
        } else {
            let animes = JSON.parse(body);
            console.log(animes);
            
            console.log("voici la liste des animes de "+username);
            animes.forEach(function(anime){
                //console.log(anime);
                animeName = anime.title;
                //console.log("city liste feature :"+cityFeature);
            });
        }
    });*/

//fonction d authentification
