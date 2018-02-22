#!/usr/bin/env node 
const program = require('commander');
const MalApi = require ('mal-api');
const inquirer = require('inquirer');
const sqlite3 = require('sqlite3').verbose();
const fs = require('fs') 

/*var dbManga = new sqlite3.Database('./manga.db');
var dbAnime = new sqlite3.Database('./anime.db');*/


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
    .option('-a, --anime [animename]', 'Read an anime\'s details') //OK 
    .option('--as, --animesearch [animename]', 'Verify if anime exist') //OK 
    .option('-m, --manga [manganame]', 'Read an manga\'s details') //OK 
    .option('--ms, --mangasearch [manganame]', 'Search manga') //OK 
    .option('--aa, --addanime [animename]', 'Add anime to anime list')
    .option('--da, --deleteanime [animename]', 'Delete an anime from user\'s anime list')
    .option('--am, --addmanga [manganame]', 'Add manga to manga list')
    .option('--dm, --deletemanga [manganame]', 'Delete a manga from user\'s manga list')
    .option('--la, --listanime', 'Display your anime list')
    .option('--lm, --listmanga', 'Display your manga list')


program.parse(process.argv) 

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------Liste-des-fonctions
var SearchAnime = async function(name){
    let data
    await mal.anime.searchAnime(name)
        .then(res => {
            //console.log(res);
            data = res;
        })
        .catch(err => console.log("Nous n'avons trouver aucune référence avec le mot clef : "+name))
    return data
}

var verifyAuthen = function(){
    mal.account.verifyCredentials()
        .then(res => console.log(res))
        .catch(err => done(err))
}

var SearchManga = async function(name){
    let data
    await mal.manga.searchManga(name)
        .then(res => {
            //console.log(res);
            data = res;
        })
        .catch(err => console.log("Nous n'avons trouver aucune référence avec le mot clef : "+name))
    return data
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

var init = function(){
    console.log("debut création du fichier !")
    fs.appendFile('anime.txt', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
    //fs.appendFile('manga.bd');
    /*dbAnime.run(sql, params, function(err){
        // 
    });
    dbManga.run(sql, params, function(err){
        // 
    });*/
}
//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------Gestion-des-options

init();

if(program.settings) {
    console.log('settings')
    dbAnime.close();
    dbManga.close();
}
else if(program.anime) {
    /*console.log("voici les détails de l'anime\n");
    console.log('nom : ${anime.title} \n nombre d\'episode : ${anime.episodes} \n status de l\'anime : ${anime.status} \n start date : ${anime.start_date} \n end date : ${anime.end_date} \n synopsis : ${anime.synopsis}');*/
    SearchAnime(program.anime).then((animeData) => {
        //console.log(animeData)
        //gérer le tableau d objet
        console.log("voici la liste trouvé avec le mot clef : "+program.anime+"\n")
        for(var item in animeData){
            console.log(animeData[item].title + ",  id : " + animeData[item].id)
        }
        inquirer.prompt([
            {    
                type: 'input',    
                message: "Entrez l'id de l'anime souhaité : ",    
                name: 'selectedAnime'  
            }
        ]).then((answers) => 
            {  
                //console.log(answers.selectedAnime) 
                for(var item2 in animeData){
                    if(animeData[item2].id == answers.selectedAnime){
                        //display data wanted
                        console.log("voici les détails de l'anime :\n");
                        //traitement du synopsis. supprimer des elements. comme les balise <br>
                        console.log(` nom : ${animeData[item2].title} \n nombre d\'episode : ${animeData[item2].episodes} \n status de l\'anime : ${animeData[item2].status} \n start date : ${animeData[item2].start_date} \n end date : ${animeData[item2].end_date} \n\n synopsis : \n${animeData[item2].synopsis}`);
                    }
                }
            })

    })
    /*dbAnime.close();
    dbManga.close();*/
}
else if(program.animesearch) {
    //console.log('animesearch', program.animesearch)
    //console.log("test", SearchAnime(program.animesearch));
    SearchAnime(program.animesearch).then((animeData) => {
        //console.log(animeData)
        if(animeData != null)
        {
            console.log("voici la liste trouvé avec le mot clef : "+program.animesearch+"\n")
            for(var item in animeData)
                console.log(animeData[item].title)
        }
    })
    /*dbAnime.close();
    dbManga.close();*/
}
else if(program.manga){
    SearchManga(program.manga).then((mangaData) => {
        console.log("voici la liste trouvé avec le mot clef : "+program.manga+"\n")
        for(var item in mangaData){
            console.log(mangaData[item].title + ",  id : " + mangaData[item].id)
        }
        inquirer.prompt([
            {    
                type: 'input',    
                message: "Entrez l'id du manga souhaité : ",    
                name: 'selectedManga'  
            }
        ]).then((answers) => 
            {  
                //console.log(answers.selectedAnime) 
                for(var item2 in mangaData){
                    if(mangaData[item2].id == answers.selectedManga){
                        //display data wanted
                        console.log("voici les détails du manga :\n");
                        console.log(` nom : ${mangaData[item2].title} \n nombre de chapitre : ${mangaData[item2].chapters} \n nombre de volumes : ${mangaData[item2].volumes} \n status du manga : ${mangaData[item2].status} \n start date : ${mangaData[item2].start_date} \n end date : ${mangaData[item2].end_date} \n\n synopsis : \n${mangaData[item2].synopsis}`);
                    }
                }
            })
    })
    /*dbAnime.close();
    dbManga.close();*/
}
else if(program.mangasearch){
    SearchManga(program.mangasearch).then((animeData) => {
        if(animeData != null)
        {
            console.log("voici la liste trouvé avec le mot clef : "+program.animesearch+"\n")
            for(var item in animeData)
                console.log(animeData[item].title)
        }
    })
    /*dbAnime.close();
    dbManga.close();*/
}
else if(program.addanime){
    /*dbAnime.close();
    dbManga.close();*/
}
else if(program.addmanga){
    /*dbAnime.close();
    dbManga.close();*/
}
else if(program.deleteanime){
    /*dbAnime.close();
    dbManga.close();*/
}
else if(program.deletemanga){
    /*dbAnime.close();
    dbManga.close();*/
}
else if(program.listanime){
    /*dbAnime.close();
    dbManga.close();*/
}
else if(program.listmanga){
    /*dbAnime.close();
    dbManga.close();*/
}
else{
    program.help();
    /*dbAnime.close();
    dbManga.close();*/
}