//do not remove this
"use strict";
//const Alexa = require("alexa-sdk");

//Constant variables
var speechOutput = "";
var scoreCounter = "";
var timer = "";
var rewards = [];
var clueCards = "";
var ques = "";
var path = 0;
var level = 0;
var hurdle = 0;
var attemptedPath = [];
var previousPath;
var score = 0;
var localSessionAttributes = {};
var gatesText = "";

//values used in index.js
const SPEECH_START_TAG = "<speak>";
const SPEECH_END_TAG = "</speak>";
const BREAK_TAG = "<break time='1s'/>";
const INTRO_SPEECH = "Welcome to the world of LOCKOUT. You are now entering an abandoned cave, full of weird and strange, yet exciting things. Fasten your seat belts and letÕs begin the voyage.";
const MENU_CONTENT = "Say Start to Start a new game,<break time='0.5s'/>or say Help to go through the Instructions<break time='0.5s'/>or, say Leaderboard to view the leaderboard.";
const HELP = "You are playing the game Lockout. You are struck in an abandoned cave. If you want to escape from this crude cave you need to travel through the cave. While travelling, you would experience fire, water, and jungle roar. You will be hindered by fireball, traps, fire dragons, drowning waters and wild animals. In order to escape from each hinderance, you will need a defense. Now the best part is you will get your defense, only if you answer my questions. No worries you will be given three clue cards throughout your journey and you can use them whenever you are struck, just say Clue. If you want to play a game say start. If you want to check out the instructions again, say help. If you want to quit the game say stop. Happy caving!!";
const CLOSE_TEXT = "Thankyou for playing. Come back again!"

//------------------------------questions and desc for the levels----------------------------------------------------------
//Questionnaire for Level 0
const LEVEL_0_DESC = "We are about to start a very tough journey. Before entering the cave you need to answer my question. Here is the question?"
const LEVEL_0 = [
                    {
                        "question" : "Which is the one thing that you can eat when hungry, drink if you feel thirsty and can burn if you feel cold.",
                        "answer" : "coconut",
                        "clue" : "Its not a nut"
                    }
               ];

const LEVEL_1_DESC = "Infront of you, there are three massive gates. The first one will lead you to a cave full of Fire with rolling fire balls. The second one will lead you to a tunnel of  water. The third path is a dense jungle."
const LEVEL_1_QUESTION = "Which gate would you like to choose, Fire, Water, or Jungle ?"

//Questionnaire for Level 1 - Fire path
const LEVEL_1F_DESC1 = "You have chosen the fire path.";
const LEVEL_1F_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/fire/Fire+Ball+Sound+Effect.mp3\" />";
const LEVEL_1F_DESC2 = "Can you hear that sound. It’s the sound flames of the fire ball that’s approaching you. It will burn you. You have a defense to protect yourself. To win the defence answer my question."
const LEVEL_1F_DESC3 = "That was a good shot. You got your ICE PACKS. Now you can defend yourself from the approaching fireballs";
const LEVEL_1F_AUDIO2 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/fire/Fire+Burning+Sound+Effect.mp3\" />";
const LEVEL_1F = [
                    {
                        "question" : "Which first electrical item did Thomas Edison invent? ",
                        "answer" : "bulb",
                        "clue" : "It removes darkness"
                    },
                    {
                        "question" : "What is the hottest continent on Earth? ",
                        "answer" : "africa",
                        "clue" : "It has the worlds largest desert"
                    },
                    {
                        "question" : "What room has no walls?",
                        "answer" : "mushroom",
                        "clue" : "You can eat this"
                    },
                    {
                        "question" : "What goes up and down but never moves?",
                        "answer" : "stairs",
                        "clue" : "It connects storeys"
                    },
                    {
                        "question" : "Which is the largest waterfall in world?",
                        "answer" : "victoria",
                        "clue" : "It has the name of a British Queen"
                    }
               ];

 //Questionnaire for Level 1 - Water path
const LEVEL_1W_DESC1 = "You have chosen the water path. The Slippery path will make you hard to walk. Be careful while walking."; 
const LEVEL_1W_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/water/CAVE+WATER+SOUND+EFFECT.mp3\" />";
const LEVEL_1W_DESC2 = "Did u hear that sound. That’s coming from the crude waterfall which is flowing, cutting through the rocks. You need to cross this waterfall. Get ready for the question in order to win your rope defence." 
const LEVEL_1W_DESC3 = "That’s a good try. Here you go with your rope defence. Spin the rope towards the other end of the falls. You are good to cross this falls now." ;      
const LEVEL_1W = [
                    {
                        "question" : "Which is the animal referred as the ship of the desert?",
                        "answer" : "camel",
                        "clue" : "Its known for its humps"
                    },
                    {
                        "question" : "Hg is the chemical symbol of which element?",
                        "answer" : "mercury",
                        "clue" : "You have a planet in the same name"
                    },
                    {
                        "question" : "Which is the longest river on the earth?",
                        "answer" : "nile",
                        "clue" : "It is also called father of african rivers"
                    },
                    {
                        "question" : "What makes up eighty percentage of our brain’s volume approximately?",
                        "answer" : "water",
                        "clue" : "it is one of basic essentials for human to live"
                    },
                    {
                        "question" : "What grows quicker—hair or toenails?",
                        "answer" : "hair",
                        "clue" : ""
                    }
               ];
//Questionnaire for Level 1 - Jungle path
const LEVEL_1J_DESC1 = "You have chosen the jungle path. This is a dense jungle full of wild animals roaring around.";
const LEVEL_1J_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/jungle/Terrifying+Animal+Sounds1.mp3\" />;"
const LEVEL_1J_DESC2 = "Did you hear that sound? Yes, its the roaring lion. The lion would kill you to feed its hunger. You need a net defence to escape from this lion"
const LEVEL_1J_DESC3 = "That was a right answer. Here you go with your net defence. Escape from the lion!";
const LEVEL_1J = [
                    {
                        "question" : "Which is the tallest animal on the earth ?",
                        "answer" : "giraffe",
                        "clue" : "They have a tan, white or yellow coats that are spotted with brown, square shapes."
                    },
                    {
                        "question" : "What does the white dove symbolize?",
                        "answer" : "peace",
                        "clue" : "Even a olive twig symbolises the same"
                    },
                    {
                        "question" : "From which language did the word “Ketchup” come?",
                        "answer" : "chinese",
                        "clue" : "These people are known for the great wall they had built"
                    },
                    {
                        "question" : "How many planets are there in our solar system?",
                        "answer" : "eight",
                        "clue" : "Its is the same as number of sides in octagon"
                    },
                    {
                        "question" : "If you are running in a race and pass the second place person, what place are you in?",
                        "answer" : "second",
                        "clue" : "Its a riddle, do not think too much"
                    }
               ];

//Questionnaire for Level 2 Fire to Fire Path
const LEVEL_2_DESC = "Welcome to Level 2 of the game. Your defense earned in Level 1 are exhausted while travelling to this level. You only have a coocnut in your backpack. Let's move on!";
//Questionnaire for Level 2 Fire to Fire Path

const LEVEL_2FF_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/fire/Fire+Burning+Sound+Effect.mp3\" />";
const LEVEL_2FF_DESC1 = "Can you hear that sound? It’s the sound of the fire tunnel which we are about to enter. In order to win a Fire Suit defense, you should answer my question.";
const LEVEL_2FF = [
                    {
                        "question" : "What’s the hardest rock?",
                        "answer" : "diamond",
                        "clue" : "Only this can cut itself"
                    },
                    {
                        "question" : "Which bird lays the largest egg",
                        "answer" : "ostrich",
                        "clue" : "The bird as tall as you "
                    },
                    {
                        "question" : "Which planet is known as the Red Planet?",
                        "answer" : "mars",
                        "clue" : "Its the third planet from the sun"
                    },
                    {
                        "question" : "In which country was Buddha born?",
                        "answer" : "nepal",
                        "clue" : "It is sandwiched between three countries India, China and Tibet"
                    },
                    {
                        "question" : "What gets wetter the more it dries?",
                        "answer" : "towel",
                        "clue" : "We use this every morning."
                    }
               ];
               
//Questionnaire for Level 2 Fire to Water Path  

const LEVEL_2FW_DESC1 = "Oh that was a miss. It’s not safe to travel through this fire tunnel without a fire suit. Let’s take the alternate route.It’s subway that will take you to the water path. The waters are also not a piece of cake to pass through. You need to cross the high speed water streams. And you need to win the boat defense in order to enter into the water path. "
const LEVEL_2FW_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/jungle/Terrifying+Animal+Sounds1.mp3\" />" 
          
const LEVEL_2FW = [
                    {
                        "question" : "Where can you find an ocean with no water?",
                        "answer" : "map",
                        "clue" : "Its made of paper"
                    },
                    {
                        "question" : "Which is the fastest country in the world?",
                        "answer" : "russia",
                        "clue" : "This is infact the largest country in the world"
                    },
                    {
                        "question" : "What is the coldest country in the world?",
                        "answer" : "chili",
                        "clue" : "Its a South American country that starts with c"
                    },
                    {
                        "question" : "I am black when clean and white when dirty. What am I?",
                        "answer" : "chalkBoard",
                        "clue" : "Every teacher uses this"
                    },
                    {
                        "question" : "Which is the largest animal in the world ?",
                        "answer" : "Blue whale",
                        "clue" : "Its name has a color of sky in it"
                    }
               ];
             
//Questionnaire for Level 2 Water to Fire Path
const LEVEL_2WF_DESC1 = "It’s a hard luck for you. You missed the question and the boat defense. Let’s take an alternate route. It’s a subway. It will take you to the Fire path. ";
const LEVEL_2WF_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/fire/Dragon+Roar+Sound.mp3\" />"
const LEVEL_2WF_DESC2  = "Can you hear that sound? It’s the sound of the fire tunnel which we are about to enter. In order to win a Fire Suit defense, you should answer my question.";
const LEVEL_2WF = [
                    {
                        "question" : "I have a head & no body, but I do have a tail. What am I?",
                        "answer" : "coin",
                        "clue" : "every nation releases this in their own versions"
                    },
                    {
                        "question" : "A sea creature with eight legs and three hearts",
                        "answer" : "octopus",
                        "clue" : "Do you remember october then think close to it."
                    },
                    {
                        "question" : "What is the currency of Sri Lanka?",
                        "answer" : "rupee",
                        "clue" : "It has the same currency as that of India"
                    },
                    {
                        "question" : "Who lived at 221B, Baker Street, London?",
                        "answer" : "Sherlock Holmes",
                        "clue" : "he is a famous detective"
                    },
                    {
                       "question" : "Which country was Leonardo da Vinci from?",
                        "answer" : "Italy",
                        "clue" : "It is famous for its pizzas"
                    }
               ];
const LEVEL_2WW_DESC1 = "That's a good try. Here you go with your rope defense. You are good to cross this falls now.";
const LEVEL_2WW_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/water/Running+Water+Sound+Effect.mp3\"/>";
const LEVEL_2WW_DESC2 = "You need to cross the high speed water streams. And you need to win the boat defense, to continue further. ";
//Questionnaire for Level 2 Water to Water Path
const LEVEL_2WW = [
                    {
                        "question" : "What do spiders in Silicon Valley want to be when they grow up?",
                        "answer" : "Web Designer",
                        "clue" : "Can u guess if I say It designs what it spins"
                    },
                    {
                        "question" : "Can you name the country from where Parmesan cheese comes?",
                        "answer" : "Italy",
                        "clue" : "This is famous for its pizzas"
                    },
                    {
                        "question" : "How many consonants are there in the English alphabet?",
                        "answer" : "Twenty one",
                        "clue" : "may be you should subtract the vowels from total"
                    },
                    {
                        "question" : "How many straight edges does a cube have?",
                        "answer" : "twelve",
                        "clue" : "It is same as the count of a dozen"
                    },
                    {
                        "question" : "What is Chandler’s last name in the sitcom Friends?",
                        "answer" : "bing",
                        "clue" : "We have a search engine in the same name."
                    }
               ];
             
//Questionnaire for Level 2 Water to Jungle Path
const LEVEL_2WJ_DESC1 = "You have missed this one too. Let’s take alternate route. This is a subway that will lead you to the dense jungle";
const LEVEL_2WJ_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/jungle/Walking+In+Forest.mp3\"/>";
const LEVEL_2WJ_DESC2 = " You need to cross this jungle full of wild animals. You can hunt down the troublesome creatures. But You need to answer the question to the Bow and arrow defence" ;
const LEVEL_2WJ = [
                    {
                        "question" : "What is the unit of pressure?",
                        "answer" : "pascal",
                        "clue" : "Its a scientist name and starts with p"
                    },
                    {
                        "question" : "Which is the only American state to begin with the letter 'p'?",
                        "answer" : "Pensylvania",
                        "clue" : "When I say pencil which country comes to your mind"
                    },
                    {
                        "question" : "Which is the nearest star to planet earth?",
                        "answer" : "sun",
                        "clue" : "This star has 8 planets revolving arround it"
                    },
                    {
                        "question" : "Which is the largest desert in the world ?",
                        "answer" : "Sahara Desert",
                        "clue" : "It is located in the african continent"
                    },
                    {
                        "question" : "What never gets any wetter no matter how hard it rains? ",
                        "answer" : "water",
                        "clue" : " Remember your path"
                    }
               ];
//Questionnaire for Level 2 Jungle to Water Path
const LEVEL_2JW_DESC1 = "You missed that one. Lets take alternate route to escape the cave. Its a subway that will lead you to the water path ";
const LEVEL_2JW_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/water/Footsteps+in+Water.mp3\">";
const LEVEL_2JW_DESC2 = "You need to cross the high speed water streams. And you need to win the boat defense, to continue further. " ;

const LEVEL_2JW = [
                    {
                        "question" : "What is the hardest substance in the human body?",
                        "answer" : "Teeth",
                        "clue" : "Its White in color"
                    },
                    {
                        "question" : "What food makes up nearly all of a Giant Panda’s diet?",
                        "answer" : "bamboo",
                        "clue" : ""
                    },
                    {
                        "question" : "What is the name of the first atomic bomb dropped on Hiroshima, Japan?",
                        "answer" : "little boy",
                        "clue" : "what would you call a young male child"
                    },
                    {
                        "question" : "What is full of holes but can still hold water?",
                        "answer" : "sponge",
                        "clue" : "Moreover it absorbs lot of water now give it a shot"
                    },
                    {
                        "question" : "Which is the worlds largest forest?",
                        "answer" : "Amazon",
                        "clue" : "we have a big e-commerce company in the same name"
                    }
               ];

//Questionnaire for Level 2 Jungle to Jungle Path
const LEVEL_2JJ_DESC1 = "That was a right answer. Here you go with your net defence. Escape from the lion!";
const LEVEL_2JJ_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/jungle/Walking+Through+Mud.mp3\">";
const LEVEL_2JJ_DESC2 = " Yes, the sounds tell you that you are in the middle of a dense jungle full of wild animals. You can hunt down the troublesome creatures. But, You need to answer the question to the Bow and arrow defence" ;
const LEVEL_2JJ = [
                    {
                        "question" : "It belongs to you but you don’t use it. It does not belong to other people but they use it. What is it?",
                        "answer" : "Phone Number",
                        "clue" : "Its your poind of contact"
                    },
                    {
                        "question" : "Which is the worlds largest island?",
                        "answer" : "Greenland",
                        "clue" : "It has a color in its name"
                    },
                    {
                        "question" : "Once you have it, you want to share it. Once you share it, you don’t have it. What is it?",
                        "answer" : "secret",
                        "clue" : ""
                    },
                    {
                        "question" : "Which is the highest waterfall in the world?",
                        "answer" : "Angel waterfalls",
                        "clue" : "Remember a Fairy tale"
                    },
                    {
                        "question" : "I am first on earth, second in heaven. I appear twice in a week, never in a month, but once in a year What am I? ",
                        "answer" : "e",
                        "clue" : "break down the question and look for alphabets "
                    }
               ];


//Questionnaire for Level 3/first round/first question
const LEVEL_31_DESC1 = "That was indeed a great escape from the tunnel. You are now in the Third Level. Fire suit is still with you.";
const LEVEL_31_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/fire/Dragon+Roar+Sound.mp3\">";
const LEVEL_31_DESC2 = "Can you hear that roar? Yes it’s a fire dragon. You will be asked three questions. You need to answer them so that you can escape from the fire dragon. Dont forget to protect your fire suit from the dragon." ;
const LEVEL_31 = [
                    {
                        "question" : "What has hands but can not clap?",
                        "answer" : "clock",
                        "clue" : "It helps you to be punctual"
                    },
                    {
                        "question" : "I have many keys but I cannot open a single lock. What am I? ",
                        "answer" : "keyboard",
                        "clue" : "Its an electronic device"
                    },
                    {
                        "question" : "Which is the second highest peak in the world?",
                        "answer" : "Mount k two",
                        "clue" : "It has a number two in its name "
                    },
                    {
                        "question" : "What has 13 hearts, but no other organs?",
                        "answer" : "deck of cards",
                        "clue" : "you can play with this"
                    },
                    {
                        "question" : "Which is largest freshwater lake in the world? ",
                        "answer" : "Lake Superior",
                        "clue" : "Never have this complex"
                    }
               ];

//Questionnaire for Level 3/second round/first question
const LEVEL_32_DESC1 = "You did well. You crossed the rivers with your boat defence. You are now in the level three. ";
const LEVEL_32_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/water/Running+Water+Sound+Effect.mp3\"/>";
const LEVEL_32_DESC2 = "This is a shark sea. Its full of sharks ready to sink your boat. Answer the questions and slide away from the sharks" ;
const LEVEL_32 = [
                    {
                    	"question" : "Its a famous saying, All roads lead to?",
                        "answer" : "rome",
                        "clue" : "It was not built in a day too"
                        
                    },
                    {
                        "question" : "What do you find in the middle of nowhere?",
                        "answer" : "h",
                        "clue" : "remember the spelling"
                    },
                    {
                        "question" : "What gives you the power and strength to walk through walls?",
                        "answer" : "door",
                        "clue" : "It can be opend and closed and has a bell too."
                    },
                    {
                        "question" : "What has a bed but doesn’t sleep and a mouth but never eats? ",
                        "answer" : "river",
                        "clue" : ""
                    },
                    {
                        "question" : "Where do fish keep their money? ",
                        "answer" : "riverbank",
                        "clue" : "think about a bank near to fishes"
                    }
               ];


//Questionnaire for Level 3/first round/second question
const LEVEL_33_DESC1 = "You are indeed a good hunter. You are right now in the third level";
const LEVEL_33_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/jungle/Walking+In+Forest.mp3\">";
const LEVEL_33_DESC2 = "This route is full of mud traps. Be careful. Answering the questions rightly will save you from the traps." ;
const LEVEL_33 = [
                    {
                        "question" : "Which is the highest mountain in Africa?",
                        "answer" : "Kilimanjaro",
                        "clue" : ""
                    },
                    {
                        "question" : "The Statue of Liberty was gifted to the United States by which country?",
                        "answer" : "france",
                        "clue" : ""
                    },
                    {
                        "question" : "What was the nationality of the great writer George Bernard Shaw?",
                        "answer" : "irish",
                        "clue" : ""
                    },
                    {
                        "question" : "What is Aurora Borealis commonly known as?",
                        "answer" : "Northern Lights",
                        "clue" : ""
                    },
                    {
                        "question" : "Is the temperature of the moon higher or lower during the day?",
                        "answer" : "higher",
                        "clue" : ""
                    }
               ];
               
const PASSAGE = " A man is found murdered on a Sunday morning. His wife calls the police, who question the wife and the staff, and are given the following alibis: the wife says she was sleeping, the butler was cleaning the closet, the gardener was picking vegetables, the maid was getting the mail, and the cook was preparing breakfast. Immediately, the police arrest the murderer. ";

//Questionnaire for final level
const LEVEL_4_DESC1 = "Level three was a great. Isnt it. we are now about to pass the land of hungry ghosts. You will meet the queen of ghosts";
const LEVEL_4_AUDIO1 = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/ghost/Ghost+gate+enterance.mp3\" />";
const LEVEL_4_DESC2 = "Answer the queen's question. You are good to go.";
const LEVEL_4 = [
                    
                    {
                        "question" : "A man is found murdered on a Sunday morning. His wife calls the police, who question the wife and the staff, and are given the following alibis: the wife says she was sleeping, the butler was cleaning the closet, the gardener was picking vegetables, the maid was getting the mail, and the cook was preparing breakfast. Immediately, the police arrest the murderer. who was the murderer?",
                        "answer" : "maid",
                        "clue" : "the women who works"
                    }
               ];
//game intent schema
const gameStatesIntents = {
    HELP: "AMAZON.HelpIntent",
    CANCEL: "AMAZON.CancelIntent",
    STOP: "AMAZON.StopIntent",
    LEADBOARD: "leadboard",
    START: "start",
    ANSWER: "answer"
};

//path intent schema
const choosePathIntents = {
    FIRE: "fire",
    WATER: "water",
    JUNGLE: "jungle"
};

//game sounds
const LOCKOUT_LAUNCH_AUDIO = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/intro/Intro+music.mp3\" />";
const LEVEL_0_AUDIO = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/intro/Intro+music.mp3\"></audio>";
const LEVEL_1_AUDIO = "<audio src=\"https://s3.amazonaws.com/alexatones/lockout/jungle/Scary+sounds+from+a+night+in+the+wild.mp3\"></audio>";

//actions
exports.handler = function (event, context) {
    try {
        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                event.session,
                function callback(sessionAttributes, speechletResponse) {
                    context.succeed(buildResponse(sessionAttributes, speechletResponse));
                });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        } else {
            console.log("Request type : "+event.request.type);
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};


/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    speechOutput = SPEECH_START_TAG + LOCKOUT_LAUNCH_AUDIO + INTRO_SPEECH + BREAK_TAG + MENU_CONTENT + SPEECH_END_TAG;
    //speechOutput = SPEECH_START_TAG + INTRO_SPEECH + BREAK_TAG + MENU_CONTENT + SPEECH_END_TAG;
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, "", "false"));
    
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    var intent = intentRequest.intent,
        intentName = intentRequest.intent.name;
    // dispatch custom intents to handlers here
    if (intentName == gameStatesIntents.START) {
         localSessionAttributes = { "ans": "", "level":"0", "path":"0"};
        session.attributes = localSessionAttributes;
        //askQuestion(intent, session, callback, 0);
        trackPath(intent, session, callback, 0, 0,"");
    } else if (intentName === gameStatesIntents.INSTRUCTIONS){
        readInstructions(intent, session, callback);
    }else if (intentName === gameStatesIntents.HELP){
        readInstructions(intent, session, callback);
    } else if (intentName === gameStatesIntents.STOP){
        stopGame(intent, session, callback);
    } else if (intentName === gameStatesIntents.CANCEL){
        stopGame(intent, session, callback);
    } else if (intentName === gameStatesIntents.ANSWER){
        console.log("Start verifyAnswer");
        verifyAnswer(intentRequest,intent, session, callback, level, path, hurdle, ques);
    } else if (intentName === choosePathIntents.FIRE){
        console.log("In FirePath");
        askQuestion(intent, session, callback, 1, 1,0,"");
    }else if (intentName === choosePathIntents.WATER){
        console.log("On WaterPAth");
        askQuestion(intent, session, callback, 1, 2,0,"");
    }else if (intentName === choosePathIntents.JUNGLE){
        console.log("On JunglePAth");
        askQuestion(intent, session, callback, 1, 3,0,"");
    }
    else {
        throw "Invalid intent";
    }
}

// -------- Intent Functions - Action logic ---------

function trackPath(intent, session, callback, level, path, preAppendspeech){
             console.log("T-Score:"+score);
            console.log("T-hurdle:"+hurdle);
            console.log("T-level:"+level);
            //if(localSessionAttributes.level != undefined){
             //   level = localSessionAttributes.level;
              //  console.log("level in TrackPath:"+localSessionAttributes.level);
            //}
    switch(level) {
        case 0:
            speechOutput = SPEECH_START_TAG + LEVEL_0_AUDIO + preAppendspeech +  LEVEL_0_DESC + BREAK_TAG; //speechOutput = SPEECH_START_TAG + preAppendspeech + "hi" + BREAK_TAG;
            break;
        case 1:
            speechOutput = SPEECH_START_TAG + preAppendspeech +LEVEL_1_AUDIO + LEVEL_1_DESC + BREAK_TAG + LEVEL_1_QUESTION +SPEECH_END_TAG ;
            callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, "", "false"));
            break;
        case 2:
            speechOutput = SPEECH_START_TAG + preAppendspeech + LEVEL_2_DESC ;
            previousPath = path;
            if(previousPath === 1){
                path = 4;
                speechOutput = SPEECH_START_TAG + preAppendspeech + LEVEL_1F_DESC3  + BREAK_TAG ;
            }else if(previousPath === 2){
                path = 7;
                speechOutput = SPEECH_START_TAG + preAppendspeech  ;
            }else{
                path = 9;
                speechOutput = SPEECH_START_TAG + preAppendspeech ;
            }
            console.log("PathVal:"+path);
            break;
        case 3:
            speechOutput = SPEECH_START_TAG + preAppendspeech + LEVEL_31_DESC1 ;
            previousPath = path;
            if(previousPath === 4 || previousPath === 7){
                path = 11;
                speechOutput = SPEECH_START_TAG + preAppendspeech +  LEVEL_31_DESC1 + LEVEL_31_AUDIO1 + LEVEL_31_DESC2;
            }else if(previousPath === 5 || previousPath === 6 || previousPath === 10){
                path = 12;
                speechOutput = SPEECH_START_TAG + preAppendspeech +  LEVEL_32_DESC1 + LEVEL_32_AUDIO1 + LEVEL_32_DESC2 ;
            }else {
                path = 13;
                speechOutput = SPEECH_START_TAG + preAppendspeech +  LEVEL_33_DESC1 + LEVEL_33_AUDIO1 + LEVEL_33_DESC2 ;
            }
            hurdle = 1;
            break;
        case 4:
            speechOutput = SPEECH_START_TAG + preAppendspeech + LEVEL_4_DESC1 + LEVEL_4_AUDIO1 + LEVEL_4_DESC2 ;
            break;
        default: gameExit(intent, session, callback);
    }
    askQuestion(intent, session, callback, level, path, hurdle,speechOutput)    
    
}

function askQuestion(intent, session, callback, level, path, hurdle, speechOutput){
    console.log("In askQuestion");
    var ans = undefined;
    switch(path) {
        case 0:
            ques = LEVEL_0[0].question;
            speechOutput = speechOutput + ques + BREAK_TAG + SPEECH_END_TAG; //speechOutput = speechOutput + SPEECH_END_TAG;    
            ans = LEVEL_0[0].answer;
            break;
        case 1:
            console.log("In 1 askQuestion");
            ques = getRandom(LEVEL_1F);
            console.log("In 1 askQuestion:"+ques.question);
            speechOutput =  SPEECH_START_TAG + LEVEL_1F_DESC1 +LEVEL_1F_AUDIO1 + LEVEL_1F_DESC2 +  speechOutput + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 2:
            ques = getRandom(LEVEL_1W);
            speechOutput = SPEECH_START_TAG +  LEVEL_1W_DESC1 +LEVEL_1W_AUDIO1 + LEVEL_1W_DESC2 + speechOutput + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 3:
            ques = getRandom(LEVEL_1J);
            speechOutput = SPEECH_START_TAG + LEVEL_1J_DESC1 +LEVEL_1J_AUDIO1 + LEVEL_1J_DESC2 + speechOutput + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 4:
            ques = getRandom(LEVEL_2FF);
            speechOutput = speechOutput + LEVEL_1F_DESC3 + LEVEL_2FF_AUDIO1 + LEVEL_2FF_DESC1 + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 5:
            ques = getRandom(LEVEL_2FW);
            speechOutput = speechOutput + LEVEL_2FW_DESC1 + LEVEL_2FW_AUDIO1 + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 6:
            ques = getRandom(LEVEL_2WF);
            speechOutput = speechOutput + LEVEL_2WW_DESC1 + LEVEL_2WW_AUDIO1 + LEVEL_2WW_DESC2 + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 7:
            ques = getRandom(LEVEL_2WW);
            speechOutput = speechOutput + LEVEL_2WF_DESC1 + LEVEL_2WF_AUDIO1 + LEVEL_2WF_DESC2 + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 8:
            ques = getRandom(LEVEL_2WJ);
            speechOutput = speechOutput + LEVEL_2WJ_DESC1 + LEVEL_2WJ_AUDIO1 + LEVEL_2WJ_DESC2 + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 9:
            ques = getRandom(LEVEL_2JW);
            speechOutput = speechOutput + LEVEL_2JJ_DESC1 + LEVEL_2JJ_AUDIO1 + LEVEL_2JJ_DESC2 + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 10:
            ques = getRandom(LEVEL_2JJ);
            speechOutput = speechOutput + LEVEL_2JW_DESC1 + LEVEL_2JW_AUDIO1 + LEVEL_2JW_DESC2 + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 11:
            if(hurdle === 1){
                ques = getRandom(LEVEL_31);
            }else if(hurdle === 2){
                ques = getRandom(LEVEL_32);
            }else if(hurdle === 3){
                ques = getRandom(LEVEL_33);
            }
            speechOutput = speechOutput + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 12:
            if(hurdle === 1){
                ques = getRandom(LEVEL_31);
            }else if(hurdle === 2){
                ques = getRandom(LEVEL_32);
            }else if(hurdle === 3){
                ques = getRandom(LEVEL_33);
            }
            speechOutput = speechOutput + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 13:
            if(hurdle === 1){
                ques = getRandom(LEVEL_31);
            }else if(hurdle === 2){
                ques = getRandom(LEVEL_32);
            }else if(hurdle === 3){
                ques = getRandom(LEVEL_33);
            }
           speechOutput = speechOutput + ques.question + SPEECH_END_TAG;
            ans = ques.answer;
            break;
        case 14:
            speechOutput = SPEECH_START_TAG + LEVEL_4[0].question + SPEECH_END_TAG;
            speechOutput = speechOutput + LEVEL_4[0].question + SPEECH_END_TAG;
            ans = LEVEL_4[0].answer;
            break;
        default: gameExit(intent, session, callback);
    }
    localSessionAttributes = { "ans": ans, "level":level, "path":path};
    session.attributes = localSessionAttributes;
    console.log("Ans in askQuestion:"+ans);
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, "", "false"));
    //verifyAnswer(intent, session, callback, level, path, hurdle, ques);
}

function isAnswerSlotValid(intent) {
    console.log("intent1:"+intent);
        console.log("intent2:"+intent.slots);
            console.log("intent3:"+intent.slots.lockoutanswer);
                console.log("intent4:"+intent.slots.lockoutanswer.value);
    var answerSlotFilled = intent && intent.slots &&
        intent.slots.lockoutanswer && intent.slots.lockoutanswer.value;
    return answerSlotFilled;
}
/**
 * Called when the user answers
 */
function verifyAnswer(intentRequest,intent, session, callback, level, path, hurdle, ques){
    console.log("In verifyAnswer")
    // handle missing slot value
    var answerSlotValid = isAnswerSlotValid(intent);
    var ans = ques.answer;
    console.log("Ques_Ans :"+ans);
    if(ans === undefined){
     ans = session.attributes.ans;
     console.log("Session_Ans :"+ans);
    }
    console.log("Session_Level :"+session.attributes.level);
    if (answerSlotValid && intent.slots.lockoutanswer.value === ans) {
             score = score+10;
            console.log("A-Score:"+score);
            console.log("A-hurdle:"+hurdle);
            console.log("A-level:"+level);
             console.log("A-Path :"+session.attributes.path);
            if(level != 3){
                speechOutput =  "You are right!";
                level = session.attributes.level;
                level++;
                localSessionAttributes = { "ans":"","level": level};
                session.attributes = localSessionAttributes;
                console.log("session.attributes.level:"+session.attributes.level);
                trackPath(intent, session, callback, level, session.attributes.path,speechOutput);
            }else if(hurdle === 1){
                speechOutput = SPEECH_START_TAG  + "You are right! Lets move to the next hurdle.";
                hurdle++;
                askQuestion(intent, session, callback, level, session.attributes.path,hurdle,speechOutput);
            }else if(hurdle === 2){
                speechOutput = SPEECH_START_TAG  + "You are right! Lets move to the next hurdle." ;
                hurdle++;
                askQuestion(intent, session, callback, level, session.attributes.path, hurdle,speechOutput);
            }else if(hurdle === 3){
                level++;
                speechOutput = "You are right! Lets move to the next level.";
                trackPath(intent, session, callback, level, session.attributes.path, speechOutput);
            }

    } else {
        console.log("Wrong Answer!!")
            if(level === 1){
                if(attemptedPath.length() === 0){
                    attemptedPath.push(path);
                    switch(path){
                        case 1: 
                            gatesText = "You are left with other two gates, say Water for Water gate, say Jungle for Jungle gate.";
                            break;
                        case 2: 
                            gatesText = "You are left with other two gates, say Fire for Fire gate, say Jungle for Jungle gate.";
                            break;
                        case 3: 
                            gatesText = "You are left with other two gates, say Water for Water gate, say Fire for Fire gate.";
                            break;
                    };

                } else if (attemptedPath.length() === 1){
                    var takenPath = attemptedPath[0];
                    attemptedPath.push(path);

                    switch(takenPath){
                        case 1: 
                            if(path === 2){
                                gatesText = "You are left with one gate, say Jungle for Jungle gate.";
                            }else {
                                gatesText = "You are left with one gate, say Water for Water gate.";
                            }
                            break;
                        case 2: 
                            if(path === 1){
                                gatesText = "You are left with one gate, say Jungle for Jungle gate.";
                            }else {
                                gatesText = "You are left with one gate, say Fire for Fire gate.";
                            }
                            break;
                        case 3: 
                            if(path === 2){
                                gatesText = "You are left with one gate, say Fire for Fire gate.";
                            }else {
                                gatesText = "You are left with one gate, say Water for Water gate.";
                            }
                            break;
                    };

                } else if (attemptedPath.length() === 2){
                    gameExit(intent, session, callback);
                } else {

                }
            } else if(level === 2){

                if(path === 4){
                    path = 5;
                }else if(path === 5){
                    gameExit(intent, session, callback);
                }

                if(path === 6){
                    path = 7;
                }else if(path === 7){
                    path = 8;
                }else{
                    gameExit(intent, session, callback);
                }    

                if(path === 9){
                    path = 10;
                }else if(path === 10){
                    gameExit(intent, session, callback);
                }

            } else if(level === 3){
                if(hurdle === 1){
                    gameExit(intent, session, callback);
                }else if(hurdle === 2){
                    gameExit(intent, session, callback);
                }else if(hurdle === 3){
                    gameExit(intent, session, callback);
                }

            }  else {

            }
            speechOutput = SPEECH_START_TAG + gatesText + SPEECH_END_TAG;
            callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, "", "false"));
    }

}

/**
 * Called when the user says Help
 */
function readInstructions(intent, session, callback){
    speechOutput = SPEECH_START_TAG + HELP + SPEECH_END_TAG;
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, "", "false"));
}

/**
 * Called when the user says Stop
 */
function stopGame(intent, session, callback){
    speechOutput = SPEECH_START_TAG + CLOSE_TEXT + SPEECH_END_TAG;
    callback(session.attributes,buildSpeechletResponseWithoutCard(speechOutput , "", "true"));
}

function gameExit(intent, session, callback){
    //Feedback/leadboard logic goes here
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session, callback) {
    callback(session.attributes, buildSpeechletResponseWithoutCard(speechOutput, "", "true"));
}

// --------- Random function to pick question -------
function getRandom(ARRAY) {
    return ARRAY[Math.floor(Math.random() * ARRAY.length)];
}

// ------- Helper functions to build responses -------

function buildSpeechletResponse(title, output, cardText, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: output
        },
        card: {
            type: "Simple",
            title: title,
            content: cardText
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
        outputSpeech: {
            type: "SSML",
            ssml: output
        },
        reprompt: {
            outputSpeech: {
                type: "PlainText",
                text: repromptText
            }
        },
        shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
        version: "1.0",
        sessionAttributes: sessionAttributes,
        response: speechletResponse
    };
}

