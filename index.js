import { dictionary, pictureDictionary, emotionIcon } from './module.js';

class Word {
  constructor(word, defintion, pictureUrl) {
    // 単語の名前
    this.word = word;
    // 単語の定義
    this.defintion = defintion;
    // 単語の画像のURL
    this.pictureUrl = pictureUrl;
  }
}

class EmotionObject {
  constructor(emotion, description, color, onomatopoeia) {
    // 感情の名前
    this.emotion = emotion;
    // その感情の説明
    this.description = description;
    // この感情を表す色
    this.color = color;
    // その単語の英語の擬音語を表す文字列の配列
    this.onomatopoeia = onomatopoeia;
  }

  // 感情のすべての擬音語のWordオブジェクトの配列を返す
  getOnomatopoeiaWords() {
    let words = []

    for (let i = 0; i < this.onomatopoeia.length; i++) {
      words.push(new Word(
        this.onomatopoeia[i],
        dictionary[this.onomatopoeia[i]],
        pictureDictionary[this.onomatopoeia[i]]
      )
      )
    }

    return words;
  }

  // コンテナのHTMLを文字列を返します。
  // このコンテナの背景は感情の色で、コンテナの上部には、感情と感情の説明が表示されています。
  // 次にこの感情の各擬音語とその定義、画像を含んだカードが表示されます。
  getHtmlContainerString() {

    let targetDom = this.createEmotionCard();

    return targetDom;
  }

  createEmotionCard() {

    let cardContainer = `<div class="
        col-12
        col-md-6
        col-lg-3
        p-4
        m-4
        text-center
        cardLink"
        style="background: ${this.color};">`

    cardContainer += `
        <a href="#${this.emotion}"></a>
        <h3 class="text-white">${this.emotion}</h3>
        <h1 class="text-white">${emotionIcon[this.emotion]}</h1>
        <p class="text-white">${this.description}</p>
        `

    cardContainer += '</div>'

    return cardContainer
  }

  createOnomatopoeiaCard() {

    const words = this.getOnomatopoeiaWords();

    let cardContainer = `<div id="${this.emotion}" style="background: ${this.color};">`

    cardContainer += `<div class="py-4 container">`

    cardContainer += `
      <div style="color: ${this.color};">
          <h3>${this.emotion}</h3>
          <p>${this.description}</p>
      </div>
      <div class="d-flex justify-content-between flex-wrap">
      `

    for (let i = 0; i < words.length; i++) {
      cardContainer += `

      <div class="d-flex px-0 my-2 col-md-5 col-12" style="background-color: white;">
          <div class="col-8">
              <h3 class="pt-3">${words[i].word}</h3>
              <p class="pt-2">${words[i].defintion}</p>
          </div>
          <div class="col-4 d-flex justify-content-center align-items-center">
              <img class="col-12 p-1" src="${words[i].pictureUrl}" alt="" style="width: 100%;">
          </div>
      </div>

                                `
    }

    cardContainer += `
            </div>
            </div>
        </div>`

    return cardContainer
  }
}



const emotions = [
  // emotion, description, color, onomatopoeia
  new EmotionObject(
    "angry",
    "feeling or showing strong annoyance, displeasure, or hostility; full of anger.",
    "red",
    ["bark", "grunt", "roar", "whack", "smack", "hiss"]),

  new EmotionObject(
    "happy",
    "feeling or showing pleasure or contentment.",
    "yellow",
    ["bling", "chatter", "chant", "giggle"]),

  new EmotionObject(
    "bad",
    "not such as to be hoped for or desired; unpleasant or unwelcome.",
    "lightblue",
    ["ahem", "clatter", "clunk"]),

  new EmotionObject(
    "sad",
    "feeling or showing sorrow; unhappy.",
    "grey",
    ["bawl", "whine", "waah"]),

  new EmotionObject(
    "surprised",
    "to feel mild astonishment or shock.",
    "purple",
    ["boom", "honk", "zing"]),

  new EmotionObject(
    "fearful",
    "feeling afraid; showing fear or anxiety.",
    "green",
    ["buzz", "caw", "crawl"]),

  new EmotionObject(
    "disgusted",
    "feeling or showing strong annoyance, displeasure, or hostility; full of anger.",
    "orange",
    ["flick", "gargle", "oink"])

];

shuffler(emotions);

const $ = document;
const emotionCardContainer = $.createElement("div");

// 上部のカード部分
emotionCardContainer.classList.add("container", "d-flex", "justify-content-center", "flex-wrap")
for (let i = 0; i < emotions.length; i++) {
  emotionCardContainer.innerHTML += emotions[i].getHtmlContainerString();
}

// 下部のカード部分
const onomatopoeiaCardContainer = $.createElement("div");
for (let i = 0; i < emotions.length; i++) {
  onomatopoeiaCardContainer.innerHTML += emotions[i].createOnomatopoeiaCard();
}

const targetDom = $.getElementById("target");

targetDom.append(emotionCardContainer);
targetDom.append(onomatopoeiaCardContainer);

// カードを毎回シャフルする
function shuffler(array) {

  // 逆順に配列を配列を見ていき、各要素をその名前のランダム要素と入れ替える
  // INFO: Fisher–Yates shuffle というアルゴリズム https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)) // 0からiのランダムなインデックス

    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}