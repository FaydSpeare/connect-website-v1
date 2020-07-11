
export default class BoardUtils {

    static isValid(state, x, y) {
        for (let row = 0; row < x; row++) {
            if (state[row][y] === 0) {
                return false;
            }
        }
        return true;
    }

    static bean = null;

    static getBean() {
        if (BoardUtils.bean == null) {
            BoardUtils.bean = new BoardUtils();
        }
        return this.bean;
    }

};