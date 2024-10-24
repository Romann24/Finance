import {CustomHttp} from "../service/custom-http.js";
import config from "../../config/config.js";

export class CreateCategory {
    constructor() {
        this.title = document.getElementById('main-header');
        const urlRoute = window.location.hash.split('?')[0];
        const agreeBtn = document.getElementById('agree');
        const disagreeBtn = document.getElementById('disagree');
        const that = this;


        if (urlRoute === '#/createIncCat'){
            this.title.innerText = 'Создание категории доходов';
            agreeBtn.onclick = createInc;
            disagreeBtn.onclick = () => {location.href = '#/incomes'}
        } if (urlRoute === '#/createExpCat') {
            this.title.innerText = 'Создание категории расходов';
            agreeBtn.onclick = createExp;
            disagreeBtn.onclick = () => {location.href = '#/expenses'}
        }

        function createExp() {
            that.createCategory('/categories/expense').then(() => {location.href = '#/expenses'})
        }
        function createInc() {
            that.createCategory('/categories/income').then(() => {location.href = '#/incomes'})
        }
    }

    async createCategory(urlRoute) {
        const categoryName = document.getElementById('name').value;

        try {
            const result = await CustomHttp.request(config.host + urlRoute, 'POST', {
                title: categoryName
            })

            if (result) {
                if (!result) {
                    throw new Error(result.message);
                }
            }
        } catch (error) {
            return console.log(error);
        }
    }
}