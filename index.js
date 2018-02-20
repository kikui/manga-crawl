#!/usr/bin/env node 
const program = require('commander') 
const request = require('request');
const MalApi = require ( ' mal-api ' )

const mal = nouveau MalApi ( {    
  var authenName = "kikuiredkill", 
  var password = "aqwzsxedc13456789"
} )

// Conﬁguration des paramètres attendus 
program  
    .version('1.0.0')  
    .option('-s, --settings', 'configure your acount')
    .option('-al, --animelist [username]', 'Read an anime list')
    .option('-a, --anime [animename]', 'Read an anime\'s details')  
    .option('-as, --animeserch [animename]', 'Search anime')
    .option('-ml, --mangalist [username]', 'Read a manga list')
    .option('-m, --manga [manganame]', 'Read an manga\'s details')
    .option('-ms, --mangaserch [manganame]', 'Search manga')
    .option('-aa, --addanime [animename]', 'Add anime to anime list')
    .option('-ua, --updateanime [animename]', 'Update an anime on user\'s anime list')
    .option('-da, --deleteanime [animename]', 'Delete an anime from user\'s anime list')
    .option('-am, --addmanga [manganame]', 'Add manga to manga list')
    .option('-um, --updatemanga [manganame]', 'Update a manga on user\'s manga list')
    .option('-dm, --deletemanga [manganame]', 'Delete a manga from user\'s manga list')


program.parse(process.argv) 

switch(program){
    case 'setting' :
        break;
    case 'animelist' :
        break;
    case 'anime' :
        let anime = serchAnime(program.anime);
        console.log("voici les détails de l'anime\n");
        console.log('nom : ${anime.title} \n nombre d\'episode : ${anime.episodes} \n status de l\'anime : ${anime.status} \n start date : ${anime.start_date} \n end date : ${anime.end_date} \n synopsis : ${anime.synopsis}');
        break;
    case 'animeserch' :
        if(serchAnime =! null)
            console.log("${program.animeserch} a été trouver dans la BDD !");
        break;
    case 'mangalist' :
        break;
    case 'manga' :
        break;
    case 'mangaserch' :
        break;
    case 'addanime' :
        break;
    case 'updateanime' :
        break;
    case 'deleteanime' :
        break;
    case 'addmanga' :
        break;
    case 'updatemanga' :
        break;
    case 'deletemanga' : 
        break;
    case default :
        program.help();
}

var verifyAuthen = function(){
    mal.account.verifyCredentials()
        .then(res => console.log(res))
        .catch(err => done(err))
}

var serchAnime = function(string name){
    mal.manga.searchManga(name)
        .then(res => {
            //console.log(res);
            return res;
        })
        .catch(err => console.error(err))
}

var serchManga = function(string name){
    mal.manga.searchManga(name)
        .then(res => {
            console.log(res);
            return res;
        })
        .catch(err => console.error(err))
}

var addAnime = function(string name, int score){
    serchAnime(name).then((anime) => {
        let animeId = anime.id;
        mal.anime.addAnime(animeId, {
            score: score;
        });
        console.log(name + " a été ajouter à votre liste !");
    }).catch(err => console.error(err))
}

var addManga = function(string name, int score){
    serchManga(name).then((manga) => {
        let mangaId = manga.id;
        mal.manga.addManga(mangaId, {
            score: score;
        });
        console.log(name + " a été ajouter à votre liste !");
    }).catch(err => console.error(err))
}

//fonction update anime/manga
//fonction delete anime/manga

















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
