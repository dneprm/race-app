import axios from '@/plugins/axios';
import { JSONpath } from '@/helpers/JSONpath';
import { generateHorsesList } from '@/helpers/generateHorsesList';
import { increaseHorseProgress } from '@/helpers/increaseHorseProgress';

const initialState = {
  initialHorsesData: [],
  horsesList: [],
  raceLaps: [],
  isRaceProgramGenerated: false,
  raceFinished: false,
  isPauseBetweenLapsActive: false,
};

const getters = {
  getCurrentRaceLapIndex(state) {
    let raceLapIndex = null;
    state.raceLaps.forEach((lap, index) => {
      if (lap.isCurrent) {
        raceLapIndex = index;
      }
    });
    return raceLapIndex;
  },
};

const mutations = {
  setInitialHorsesData(state, payload) {
    state.initialHorsesData = payload;
  },
  setHorsesList(state, payload) {
    state.horsesList = payload;
  },
  initRaceLaps(state) {
    const laps = process.env.VUE_APP_RACE_LAPS.split(',');
    state.raceLaps = laps.map((lap) => {
      return {
        isCurrent: false,
        isInProgress: false,
        lapDistance: +lap,
        program: [],
        result: []
      };
    });
  },
  setRaceLaps(state, payload) {
    state.raceLaps = payload;
  },
  setRaceProgramGenerated(state, payload) {
    state.isRaceProgramGenerated = payload;
  },
  generateRaceLapsProgram(state) {
    state.raceLaps.forEach((lap, index) => {
      const horsesList = generateHorsesList(state.horsesList, process.env.VUE_APP_HORSES_IN_LAP_COUNT);
      state.raceLaps[index].program = horsesList.map((item, index) => {
        return {
          ...item,
          'position': index + 1,
          'progress': 0,
          'interval': null,
        }
      });
    });
    state.isRaceProgramGenerated = true;
  },
  setIsCurrentRaceLapState(state, payload) {
    state.raceLaps[payload.index].isCurrent = payload.state;
  },
  setRaceLapPropertyState(state, payload) {
    state.raceLaps[payload.index][payload.property] = payload.state;
  },
  setLapRaceProgramPropertyState(state, payload) {
    state.raceLaps[payload.raceLapIndex].program[payload.programIndex][payload.property] = payload.value;
  },
  clearLapRaceProgramIntervals(state, raceLapIndex) {
    state.raceLaps[raceLapIndex].program.forEach((item, index) => {
      state.raceLaps[raceLapIndex].program[index].interval = clearInterval(state.raceLaps[raceLapIndex].program[index].interval);
    });
  },
  setRaceFinished(state, payload) {
    state.raceFinished = payload;
  },
  setPauseBetweenLapsState(state, payload) {
    state.isPauseBetweenLapsActive = payload;
  },
};

const actions = {
  async fetchHorsesData({ commit }) {
    try {
      const data = await axios.get(`${JSONpath()}/horsesData.json`);
      const horsesData = data.data;

      commit('setInitialHorsesData', horsesData);
      return horsesData;
    } catch (error) {
      return error.response;
    }
  },
  increaseLapRaceProgramProgress({ commit, dispatch, state }, raceLapIndex) {
    state.raceLaps[raceLapIndex].program.forEach((item, index) => {
      const interval = setInterval(() => {
        // don't set interval if horse progress is already 100
        if (state.raceLaps[raceLapIndex].program[index].progress === 100) {
          return;
        } 

        const curentProgress = state.raceLaps[raceLapIndex].program[index].progress;
        const horseCondition = state.raceLaps[raceLapIndex].program[index].condition;
        const lapDistance = state.raceLaps[raceLapIndex].lapDistance;
        const increasedProgress = increaseHorseProgress(curentProgress, horseCondition, lapDistance);

        // write progress to store
        commit('setLapRaceProgramPropertyState', {
          raceLapIndex,
          programIndex: index,
          value: increasedProgress,
          property: 'progress'
        });
        
        if (increasedProgress === 100) {
          // clear interval
          commit('setLapRaceProgramPropertyState', {
            raceLapIndex,
            programIndex: index,
            value: clearInterval(state.raceLaps[raceLapIndex].program[index].interval),
            property: 'interval'
          });


          // write horse to result array
          commit('setRaceLapPropertyState', {
            index: raceLapIndex,
            property: 'result',
            state: [...state.raceLaps[raceLapIndex].result, item]
          });

          // if all horses in a lap finished 
          if (state.raceLaps[raceLapIndex].result.length === +process.env.VUE_APP_HORSES_IN_LAP_COUNT) {
            // set isCurrent and isInProgress to false for current lap
            commit('setRaceLapPropertyState', {
              index: raceLapIndex,
              property: 'isCurrent',
              state: false
            });
            commit('setRaceLapPropertyState', {
              index: raceLapIndex,
              property: 'isInProgress',
              state: false
            });

            
            // run next lap if one after 2 seconds
            if (state.raceLaps[raceLapIndex + 1]) {
              // set pause between laps active
              commit('setPauseBetweenLapsState', true);
              setTimeout(() => {
                // set pause between laps active
                commit('setPauseBetweenLapsState', false);
                // set isCurrent to true for next lap
                commit('setRaceLapPropertyState', {
                  index: raceLapIndex + 1,
                  property: 'isCurrent',
                  state: true
                });
                // set isInProgress to true for next lap
                commit('setRaceLapPropertyState', {
                  index: raceLapIndex + 1,
                  property: 'isInProgress',
                  state: true
                });
                dispatch('increaseLapRaceProgramProgress', raceLapIndex + 1);
              }, +process.env.VUE_APP_PAUSE_BETWEEN_LAPS);
            } else { // or set race finished
              commit('setRaceFinished', true);
              commit('setRaceProgramGenerated', false);
            }
          }
        }
      }, 1000);

      commit('setLapRaceProgramPropertyState', {
        raceLapIndex,
        programIndex: index,
        value: interval,
        property: 'interval'
      });
    });
  },
};


export default {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};
