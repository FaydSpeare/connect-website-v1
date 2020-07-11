import BoardUtils from "./BoardUtils";
import {backendURL, frontEndURL} from "../constants";
import Session from "../session/Session";

class BoardSession {

    constructor(callback, gameId=null, spectate=false) {

        this.callback = callback;
        this.gameId = gameId;
        this.playerNumber = null;
        this.tiles = [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0]
        ];
        this.winCombination = null;
        this.loadBoard = false;

        this.chatLines = [];

        this.opponent = {
            username: null,
            elo: null
        };

        this.me = {
            username: null,
            elo: null
        };

        this.size = 70;
        this.spectating = spectate;
        this.turn = 1;
        this.aiGame = false;

        if (gameId !== null) {
            if (spectate) {
                this.spectateExistingGame();
            } else {
                this.joinExistingGame();
            }

            this.loadBoard = true;
        }

    }

    updatePlayersCallback = (players) => {
        console.log("updating players");
        let myPlayerNum = players[0].username === Session.getUsername() ? 1 : 2;
        if (players[1].username !== Session.getUsername()) {
            myPlayerNum = 1;
        }

        this.opponent = {
            username: players[3 - myPlayerNum - 1].username,
            elo: players[3 - myPlayerNum - 1].elo,
        };

        this.me = {
            username: players[myPlayerNum - 1].username,
            elo: players[myPlayerNum - 1].elo,
        };

    };

    spectateExistingGame() {
        this.subscribeToGame();
        fetch(backendURL + `/game/spectate/${this.gameId}`)
            .then(response => response.json())
            .then(json => {

                console.log("Spectate request sent. response: ", json);

                this.tiles = json.board;
                this.updatePlayersCallback(json.players);
                this.playerNumber = 1;
                this.callback();


            }).catch(e => {
            console.log(e);
        });
    }

    async joinExistingGame() {
        await this.subscribeToGame();
        fetch(backendURL + `/game/${Session.getUserId()}/join/${this.gameId}`)
            .then(response => response.json())
            .then(json => {

                console.log("Join request sent. response: ", json);

                if (json.success) {
                    this.gameId = json.gameId;
                    this.playerNumber = json.playerNumber;
                }

            }).catch(e => {
                console.log(e);
            });
    }


    async createNewGame(aiGame) {
        this.aiGame = aiGame;
        console.log("Sending request to create new game");
        let userId = Session.getUserId();
        let url = aiGame ? "/game/new-ai-game/" : "/game/new-human-game/";
        await fetch(backendURL + url + userId)
            .then(response => response.json())
            .then(json => {

                console.log("Create request sent. response: ", json);

                if (json.success) {
                    this.gameId = json.gameId;
                    this.playerNumber = json.playerNumber;
                    this.subscribeToGame();
                    this.addJoinChatLine();
                    this.callback();
                }

            }).catch(e => {
                console.log(e);
            });

        if (aiGame) {
            fetch(backendURL + `/game/9999/join/${this.gameId}`)
                .then(response => response.json())
                .then(json => {
                    console.log("Create join sent. response: ", json);
                }).catch(e => {
                console.log(e);
            });
        }

    }

     subscribeToGame() {
        console.log("Subscribed to event source");
        this.eventSource = new EventSource(backendURL + `/game/subscribe/${this.gameId}`);
        this.eventSource.onmessage = event => {
            let json = JSON.parse(event.data);
            console.log("Event Received. event: ", json);
            if (event.lastEventId === "INIT") {
                this.updatePlayersCallback(json.players);
            } else if (event.lastEventId === "UPDATE") {
                this.tiles = json.board;
                this.winCombination = json.winCombination;
                this.turn = json.turn;
            } else if (event.lastEventId === "CHAT") {
                this.chatLines.push({
                    username: json.username,
                    chatLine: json.chatLine
                });
            }
            this.callback();
        };
    }

    sendUpdate() {
        console.log("sending update");
        fetch(backendURL + '/game/update',{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gameId: this.gameId,
                board: this.tiles
            })
        }).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        })
    }

    place(row, col) {
        console.log("attempting placement");
        if (!this.spectating && BoardUtils.isValid(this.tiles, row, col)) {
            if (this.opponent.username != null && this.turn === this.playerNumber) {
                this.tiles[row][col] = this.playerNumber;
                this.turn = 3 - this.turn;
                this.callback();
                console.log(window.scrollY);
                this.sendUpdate();
                console.log(window.scrollY);
            }
        }
    }

    get(row, col) {
        return this.tiles[row][col];
    }

    isWinningTile(row, col) {
        if (this.winCombination == null) {
            return false;
        }
        for (let i = 0; i < this.winCombination.length; i++) {
            let item = this.winCombination[i];
            let iCol = item % 7;
            let iRow = (item - iCol) / 7;
            if (row === iRow && col === iCol) {
                return true;
            }
        }
    }

    loadGameBoard = () => {
        this.loadBoard = true;
        this.callback();
    };

    addJoinChatLine() {
        this.chatLines.push({
            username: "SYSTEM",
            chatLine: frontEndURL + "/join/" + this.gameId
        });
        this.chatLines.push({
            username: "SYSTEM",
            chatLine: frontEndURL + "/spectate/" + this.gameId
        });
    }

    setBoardSize(size) {
        this.size = size;
    }
}

export default BoardSession;