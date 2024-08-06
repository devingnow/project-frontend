var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getUserIdAndNickName } from "../loginLogic/loginLogic.getUserInfo.js";
document.querySelector("#bottom-file").addEventListener("change", (e) => {
    const uploadedFile = e.target;
    const file = uploadedFile.files[0];
    if (file && file.name.length > 0) {
        document.querySelector(".bottom-fileName").textContent = file.name;
    }
    else {
        document.querySelector(".bottom-fileName").textContent = "";
    }
});
document.querySelector(".wright-form").addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const formData = new FormData(e.target);
    const textAreaValue = formData.get('boardContent');
    const inputValue = formData.get('boardTitle');
    if (inputValue.trim() === '') {
        alert("제목을 입력해주세요");
        return;
    }
    if (textAreaValue.trim() === '') {
        alert("내용을 입력해주세요");
        return;
    }
    const userInfo = yield getUserIdAndNickName();
    try {
        const response = yield fetch("http://localhost:3000/board/jmt/postCreate", {
            method: 'POST',
            headers: {
                "userToken": userInfo.uid,
                "unickname": userInfo.unickname,
            },
            body: formData,
        });
        if (response.ok) {
            window.location.href = "../category/jmt.html";
        }
        else {
            console.log("서버 오류: ", response.status);
            alert("서버 오류 발생, 다시 시도해주세요.");
        }
    }
    catch (err) {
        console.log("patch 전송오류: ", err);
    }
}));
