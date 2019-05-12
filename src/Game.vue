<template>
  <div class="container-game">
    <div v-for="(faild, i) of table" :key="i" class="faild" :class="color(i)" @click="move(i)"></div>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'Game',
  props: ['finish'],
  data () {
    return {
      table: [], // главный массив для регистрации всех клеток
      colors: [
        'red',     
        'red',
        'blue',    
        'blue',
        'yellow',  
        'yellow',
        'green',   
        'green',
        'purple',  
        'purple',
        'orange',  
        'orange',
        'pink',    
        'pink',
        'indigo',  
        'indigo'
      ],
      variable: -1, // переменная помогает определить что мы выбираем
      counter: [] // счёткик уже найденных пар
    }
  },

  // при создании компонента заполняем главный массив значениями false и перемешиваем цвета
  created() {

    for(let i = 0; i < 16; i++){
      this.table.push(false);
    }

    for (let i = 15; i > 0; i--) {

        let j = Math.floor(Math.random() * i); // случайный индекс
        [this.colors[i], this.colors[j]] = [this.colors[j], this.colors[i]];// здесь мы просто 16 раз меняем местами 2, каждый раз, случайных элемента

    }
  },

  methods: {

    // функция определяющая цвет квадратика
    color: function(index) {
      return this.table[index]? this.colors[index]: 'white'
    },

    // МОЗГИ
    move: function(index) {

      // сначала, проверяем, незакрашен ли уже данный квадрат
      if (this.counter.indexOf(this.colors[index]) == -1 && index != this.variable) {
        
        // затем узнаём что мы ищем (если ищем пару, то variable будет равен индексу квадрата, к которому ищем пару)
        if (this.variable != -1) {
          
          // открываем квадрат
          Vue.set(this.table, index, true);

          // если это не пара, то мы закроем оба квадрата через 0,2 секунды
          if (this.colors[this.variable] != this.colors[index]) {

            setTimeout(() => { Vue.set(this.table, index, false); }, 200)
            Vue.set(this.table, this.variable, false);

          } else {
            // иначе фиксируем в счётчике
            this.counter.push(this.colors[index]);
            
          }

          this.variable = -1;

        } else {
          
          // открываем квадрат
          Vue.set(this.table, index, true);
          // передаём переменной индекс квадрата, что бы игрок теперь искал пару
          this.variable = index;
        }
      }
    }
  },
  updated() { // если все пары найдены, говорим об этом родительскому элементу
      if (this.counter.length == 8) {
          this.finish()
      }
  },
}
</script>

<style lang="scss">
  .container-game{
    width: 800px;
    height: 800px;
    margin: 0 auto;
    background-color: aqua;
  }

  .faild{
    width: 190px;
    height: 190px;
    background-color: white;
    display: inline-grid ;
    border: 5px solid gray
  }

  .faild:hover{
    border-color: green
  }
  
  .white{ background-color: white; }
  .red{ background-color: #FF3430 }
  .green{ background-color: #00B338 }
  .blue{ background-color: #127FCC }
  .yellow{ background-color: #FFFF4A }
  .pink{ background-color: #FF24F2 }
  .orange{ background-color: #FF6724 }
  .purple{ background-color: #673ab7 }
  .indigo{ background-color:#1a237e }

</style>