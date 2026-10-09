let currentScene = 'scene1';
let yesClicked = false;

// 페이드 인 적용 장면 (장면 5, 6, 7 제외)
const fadeScenes = ['scene1', 'scene2', 'scene3', 'scene4', 'scene8'];

// 텍스트 리빌 + 이미지 "동시" 페이드인 → 이후 화살표 페이드인
function playReveal(sceneId, textDelay = 1000, arrowDelay = 1000) {
const scene = document.getElementById(sceneId);
const text = scene.querySelector('.reveal-text');
const img = scene.querySelector('.logo-img');
const arrow = scene.querySelector('.arrow');

setTimeout(() => {
// 글자 리빌과 이미지 페이드인 동시에 시작
if (text) text.classList.add('revealed');
if (img) img.classList.add('show');

// 리빌(1.2초) 완료 후 지정 시간 뒤 화살표 페이드인
if (arrow) {
setTimeout(() => {
arrow.classList.add('show');
}, 1200 + arrowDelay);
}
}, textDelay);
}

function goToScene(sceneId) {
document.getElementById(currentScene).classList.remove('active');
const next = document.getElementById(sceneId);
next.classList.add('active');

if (fadeScenes.includes(sceneId)) {
next.classList.remove('fade-in');
void next.offsetWidth;
next.classList.add('fade-in');
}

currentScene = sceneId;

// 각 장면 리빌 처리
if (['scene2', 'scene3'].includes(sceneId)) {
playReveal(sceneId, 1000, 1000);
}
if (sceneId === 'scene4') {
playReveal(sceneId, 0, 3000); // 화살표는 3초 후
}
if (sceneId === 'scene5') {
playReveal(sceneId, 0, 0);
}

// 장면 6: 2초 후 자동으로 장면 7 시작
if (sceneId === 'scene6') {
setTimeout(() => {
goToScene('scene7');
startTyping();
}, 2000);
}

// 장면 8: 이미지 페이드인
if (sceneId === 'scene8') {
setTimeout(() => {
document.getElementById('scene8-img').classList.add('show');
}, 500);
}
}

// 장면 5: "네." 버튼
function confirmYes() {
if (!yesClicked) {
yesClicked = true;
document.getElementById('scene5-text').textContent = '정말?';
} else {
goToScene('scene6');
}
}

// 장면 5: "아니오." 버튼 → 검은 화면
function showBlack() {
document.getElementById(currentScene).classList.remove('active');
document.getElementById('black-screen').classList.add('active');
currentScene = 'black-screen';

setTimeout(() => {
document.getElementById('black-text').classList.remove('hidden');
}, 2000);
}

// 장면 7: 반드시 3초 동안 원래 "啊"에 이어붙이며 타이핑
function startTyping() {
const container = document.getElementById('infinite-text');

const fontSize = 16; // 1rem
const charWidth = fontSize * 1.17; // 자간 17% 포함
const charsPerLine = Math.floor(window.innerWidth / charWidth);
const lines = Math.floor(window.innerHeight / (fontSize * 1.5));
const totalChars = charsPerLine * lines;

// 3초(3000ms) 안에 채우도록 간격 자동 계산
const interval = Math.max(3000 / totalChars, 4);
let count = 1; // 원래 "啊" 하나 포함

const timer = setInterval(() => {
container.textContent += '啊';
count++;

if (count >= totalChars || container.scrollHeight > window.innerHeight) {
clearInterval(timer);
setTimeout(() => {
goToScene('scene8');
}, 500);
}
}, interval);
}

// 장면 1 시작: 1초 후 텍스트 리빌 + 이미지 동시 페이드인
window.addEventListener('load', () => {
playReveal('scene1', 1000, 1000);
});
