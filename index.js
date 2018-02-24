#!/usr/bin/env node 
const program = require('commander');
const MalApi = require ('mal-api');
const inquirer = require('inquirer');
var sqlite3 = require('sqlite3').verbose();
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------initialisation-BDD

var db = new sqlite3.Database('mydb.db', (err) => {
    if(err){
        console.log("ERREUR ouverture de la bdd")
    }
    //console.log("log du db")  
});

db.serialize(function() {
    db.run("CREATE TABLE if not exists manga(title TEXT, idmanga TEXT, chapters TEXT, volumes TEXT, status TEXT, start_date TEXT, end_date TEXT, synopsis TEXT)");
    db.run("CREATE TABLE if not exists anime(title TEXT, idanime TEXT, episodes TEXT, status TEXT, start_date TEXT, end_date TEXT, synopsis TEXT)");
});


var username = "kikuiredkill";
var password = "aqwzsxedc123456789";

const mal = new MalApi ( {    
  username, 
  password,
} )

//------------------------------------------------------------------------------------------------------------------------------------------------------------------initialisation-des-options

// Conﬁguration des paramètres attendus 
program  
    .version('1.0.0')  
    .option('-a, --anime [animename]', 'Read an anime\'s details') //OK 
    .option('--as, --animesearch [animename]', 'Verify if anime exist') //OK 
    .option('-m, --manga [manganame]', 'Read an manga\'s details') //OK 
    .option('--ms, --mangasearch [manganame]', 'Search manga') //OK 
    .option('--aa, --addanime [animename]', 'Add anime to anime list') //OK
    .option('--da, --deleteanime', 'Delete an anime from user\'s anime list') //OK
    .option('--am, --addmanga [manganame]', 'Add manga to manga list') //OK
    .option('--dm, --deletemanga', 'Delete a manga from user\'s manga list') //OK
    .option('--la, --listanime', 'Display your anime list') //OK
    .option('--lm, --listmanga', 'Display your manga list') //OK
    .option('-b, --bonus', 'Bonus party') //OK


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

var GetWeather = function(){
    let url = "http://api.openweathermap.org/data/2.5/weather?q=bordeaux&units=metric&APPID=1b4b96d0d441510338048c66a9e19ae3";
    requestWeather = new XMLHttpRequest();
    requestWeather.open("get", url, true);
    requestWeather.onload = function() {
        var results = JSON.parse(requestWeather.responseText);
        console.log("A Bordeaux il fait actuellement : "+ results.main.temp+ "°C")
    }
    requestWeather.send();
    
}

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------Gestion-des-options

if(program.settings) {
    console.log('settings')
    db.close();
}
else if(program.anime) {
    SearchAnime(program.anime).then((animeData) => {
        //console.log(animeData)
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
                        console.log(` nom : ${animeData[item2].title} \n nombre d\'episode : ${animeData[item2].episodes} \n status de l\'anime : ${animeData[item2].status} \n start date : ${animeData[item2].start_date} \n end date : ${animeData[item2].end_date} \n\n synopsis : \n${animeData[item2].synopsis}`);
                    }
                }
            })

    })
    db.close();
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
    db.close();
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
    db.close();
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
    db.close();
}
else if(program.addanime){
    SearchAnime(program.addanime).then((animeData) => {
        console.log("voici la liste trouvé avec le mot clef : "+program.addanime+"\n")
        for(var item in animeData){
            console.log(animeData[item].title + ",  id : " + animeData[item].id)
        }
        inquirer.prompt([
            {    
                type: 'input',    
                message: "Entrez l'id de l'anime à sauvegarder : ",    
                name: 'selectedAnime'  
            }
        ]).then((answers) => 
            {  
                //console.log(answers.selectedAnime) 
                for(var item2 in animeData){
                    if(animeData[item2].id == answers.selectedAnime){
                        console.log("correspondence trouvé !")
                        db.run("INSERT INTO anime(title, idanime, episodes, status, start_date, end_date, synopsis) VALUES(?,?,?,?,?,?)", [`${animeData[item2].title}`,`${animeData[item2].id}`, `${animeData[item2].episodes}`,`${animeData[item2].status}`,`${animeData[item2].start_date}`,`${animeData[item2].end_date}`,`${animeData[item2].synopsis}`], function(err) {
                            if (err) {
                                //SQLITE_MISUSE: Database is closed ! pourquoi ?
                                //j arrive pas a ecrire dans la bdd
                                return console.log("erreur : "+err.message);
                            }else{
                                console.log("L'anime à été ajouté à votre list ! vous pouvez avoir acces à votre liste avec la commande : manga-crawl --la");
                            }
                        });
                    }
                }
            })
    })
    db.close();
}
else if(program.addmanga){
    SearchManga(program.addmanga).then((mangaData) => {
        console.log("voici la liste trouvé avec le mot clef : "+program.addmanga+"\n")
        for(var item in mangaData){
            console.log(mangaData[item].title + ",  id : " + animeData[item].id)
        }
        inquirer.prompt([
            {    
                type: 'input',    
                message: "Entrez l'id du manga à sauvegarder : ",    
                name: 'selectedManga'  
            }
        ]).then((answers) => 
            {  
                //console.log(answers.selectedManga) 
                for(var item2 in animeData){
                    if(mangaData[item2].id == answers.selectedManga){
                        console.log("correspondence trouvé !")
                        db.run("INSERT INTO manga(title, idmanga, chapters, volumes, status, start_date, end_date, synopsis) VALUES(?,?,?,?,?,?)", [`${mangaData[item2].title}`, `${mangaData[item2].id}`,`${mangaData[item2].chapters}`,`${mangaData[item2].volumes}`,`${mangaData[item2].status}`,`${mangaData[item2].start_date}`,`${mangaData[item2].end_date}`,`${mangaData[item2].synopsis}`], function(err) {
                            if (err) {
                                //SQLITE_MISUSE: Database is closed ! pourquoi ?
                                //j arrive pas a ecrire dans la bdd
                                return console.log("erreur : "+err.message);
                            }else{
                                console.log("Le manga à été ajouté à votre list ! vous pouvez avoir acces à votre liste avec la commande : manga-crawl --lm");
                            }
                        });
                    }
                }
            })
    })
    db.close();
}
else if(program.deleteanime){
    let sql = "SELECT title, id FROM anime ORDER BY title";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err);
        }
        rows.forEach((row) => {
            console.log(row.title + ", id : " + row.id);
        });
    });
    inquirer.prompt([
            {    
                type: 'input',    
                message: "Entrez l'ID de l'anime à supprimer de votre liste : ",    
                name: 'animeSelected'  
            }
    ]).then((answers) => {
        db.run(`DELETE FROM anime WHERE idanime=?`, answers.animeSelected, function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log("Anime supprimer avec succes !");
        });
    })
    db.close();
}
else if(program.deletemanga){
    let sql = "SELECT title, id FROM manga ORDER BY title";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.title + ", id : " + row.id);
        });
    });
    inquirer.prompt([
            {    
                type: 'input',    
                message: "Entrez l'ID du manga à supprimer de votre liste : ",    
                name: 'mangaSelected'  
            }
    ]).then((answers) => {
        db.run(`DELETE FROM manga WHERE idmanga=?`, answers.mangaSelected, function(err) {
            if (err) {
                return console.error(err.message);
            }
            console.log("Manga supprimer avec succes !");
        });
    })
    db.close();
}
else if(program.listanime){
    console.log("Voici votre liste d'anime : ")
    let sql = "SELECT title, id FROM anime ORDER BY title";
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        rows.forEach((row) => {
            console.log(row.title + ", id : " + row.id);
        });
    });
    inquirer.prompt([
            {    
                type: 'input',    
                message: "Voulez vous voire les details d un anime ? yes/no : ",    
                name: 'response'  
            }
        ]).then((answers) => 
            {  
                if(answers.response == "yes"){
                    inquirer.prompt([
                        {
                            type: 'input',    
                            message: "Entrez l'ID de l'anime souhaiter : ",    
                            name: 'animeSelected'
                        }
                    ]).then((answers) =>{
                        let sql = `SELECT * FROM anime WHERE id=?`;
                        db.each(sql, [answers.animeSelected], (err, row) => {
                            if (err) {
                                throw err;
                            }
                            console.log("voici les details de l'anime :");
                            console.log(row.title + ", id : " + row.id);
                            console.log("nombre d'épisodes : "+row.episodes);
                            console.log("status de l'anime : "+row.status);
                            console.log("date de debut : "+row.start_date);
                            console.log("date de fin : "+row.end_date);
                            console.log("synopsis : "+row.synopsis);
                        });
                    })
                }
                else if(answers.response == "no"){
                    console.log("OK bonne journée !")
                }
                else{
                    console.log("input error !")
                }
            })
    db.close();
}
else if(program.listmanga){
    console.log("Voici votre liste de manga : ")
    let sql = "SELECT title, id FROM manga ORDER BY title";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.log(err);
        }
        rows.forEach((row) => {
            console.log(row.title + ", id : " + row.id);
        });
    });
    inquirer.prompt([
            {    
                type: 'input',    
                message: "Voulez vous voire les details d un manga ? yes/no : ",    
                name: 'response'  
            }
        ]).then((answers) => 
            {  
                if(answers.response == "yes"){
                    inquirer.prompt([
                        {
                            type: 'input',    
                            message: "Entrez l'ID du manga souhaité : ",    
                            name: 'mangaSelected'
                        }
                    ]).then((answers) =>{
                        let sql = `SELECT * FROM manga WHERE id=?`;
                        db.each(sql, [answers.mangaSelected], (err, row) => {
                            if (err) {
                                throw err;
                            }
                            console.log("voici les details de l'anime :");
                            console.log(row.title + ", id : " + row.id);
                            console.log("nombre d'épisodes : "+row.chapters);
                            console.log("nombre d'épisodes : "+row.volumes);
                            console.log("status de l'anime : "+row.status);
                            console.log("date de debut : "+row.start_date);
                            console.log("date de fin : "+row.end_date);
                            console.log("synopsis : "+row.synopsis);
                        });
                    })
                }
                else if(answers.response == "no"){
                    console.log("OK bonne journée !")
                }
                else{
                    console.log("input error !")
                }
            })
    db.close();
}
else if(program.bonus){
    console.log("petit bonus !")
    GetWeather()
}
else{
    db.close();
    program.help(); 
}