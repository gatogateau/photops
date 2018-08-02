# photops

Photo-ops is a group interactive game meant to be played on your cell phone, using your camera.

Set up:
The user signs up with a username and password, then adds several pictures of thier face to the database. The facial recognition is more accurate when more pictures are used.  

After signing up, you can either create a game, or join an existing game.    Once you join the game, the game creator will start the game.  

Playing the game:  
Once the game is started, you will be assigned a target.  You must find your target, and, using your camera take a picture to eliminate or assassinate your target.  The picture is then sent for verification through the facial recognition.  Once the target is verified as eliminated, the user assumes the target's target and continues in the game.  

The game ends when only 1 player remains.  



Front end and Back end programming:

This application is a dynamic web applicatioin that is built using ReactJS on the the client side, incorporating passport for user security, and kairos for facial recognition.  This application can be used on a desktop/ laptop but is more suited and designed as a game to be played on the cell phone and mobile devices.  

The "heavy lifting" is done on the server side using MongoDB and Mongoose to store the information.   The API calls and controllers run all the logic and functionality of the site.  This game relies heavily on api calls to the database to keep the game information continuously updated.  
