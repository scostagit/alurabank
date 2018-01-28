import { NegociacaoController} from './controllers/NegociacaoController';

const controller = new NegociacaoController();

//TypeScrip
// document
//    .querySelector(".form")
//    .addEventListener("submit",controller.adiciona.bind(controller));

//Jquery
$('.form').submit(controller.adiciona.bind(controller));