"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageReader = void 0;
const Tesseract = __importStar(require("tesseract.js"));
class ImageReader {
    constructor() {
        this.worker = Tesseract.createWorker({
            logger: m => console.log(m)
        });
    }
    convertToText(imgScreenshot) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.worker.load();
            yield this.worker.loadLanguage('eng');
            yield this.worker.initialize('eng');
            const { data: { text } } = yield this.worker.recognize(imgScreenshot);
            console.log('text', text);
            return text;
            // await this.worker.loadLanguage('eng');
            // await this.worker.initialize('eng');
            // const imgText = this.worker.recognize(imgScreenshot);
            // const text = (await imgText).data.text;
            // console.log('texto',text);
            // return text;
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.worker.terminate();
        });
    }
}
exports.ImageReader = ImageReader;
