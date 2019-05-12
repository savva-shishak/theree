<template>
  <div>
    <p>{{ status }}</p>
    <button @click="startGame" v-if="start">Начать игру</button>
    <p v-if="timer">Время: {{ minute }}.{{ second }}.{{ milliseconds }}</p>

    <p v-if="!timer && !start"> Вы справились за 
      <span v-show="minute != 0" >{{ minute }} минут</span> <br>
      <span v-show="second != 0" >{{ second }} секунд(ы)</span> <br>
      <span v-show="milliseconds != 0" >{{ milliseconds }} миллисекунд(ы)</span>
    </p>

    <game :finish='finished' v-if="game"></game>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  data() {
    return {
      // это переменные просто, чтобы скрывать/показывать элементы и для времени 
      status: 'Нажмите кнопку, чтобы начать игру',
      game: false,
      milliseconds: 0,
      second: 0,
      minute: 0,
      timer: undefined,
      start: true
    }
  },
  methods: {
    // начало
    startGame: function () {
      this.game = true;
      this.timer = setInterval(this.tick, 1);
      this.status = 'Время пошло, найдите все пары квадратиков с одинаковыми цветами за 5 минут'
      this.start = false
    },

    // победа (вызывается из дочернего компонента)
    finished: function () {
      clearInterval(this.timer);
      this.status = 'Вы выйграли!!!';
      this.timer = undefined;
    },

    // проигрыш
    gameOver: function () {
      clearInterval(this.timer);
      this.status = "Время вышло, вы проиграли";
      this.game = false
    },

    // время
    tick: function () {
      this.milliseconds++
      if (this.milliseconds == 1000) {

        this.milliseconds = 0;
        this.second++;

        if(this.second == 60 ){

          this.second = 0;
          this.minute++;

          if (this.minute == 5) {
            this.gameOver() // проигрыш, если minute больше 5
          }
        }
      }
    }
  }
}
</script>

<style lang="scss">
  div{
    text-align: center;
  }
</style>
