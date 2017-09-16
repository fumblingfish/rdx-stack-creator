import {fromJS} from 'immutable'



const partialApply = (...leftArgs) =>
   fn =>
      (...rightArgs) =>
         fn.apply(this, [...leftArgs, ...rightArgs])


export const PUSH = 'PUSH'
export const push = (suffix, key, payload) => ({
   type: `${PUSH}_${suffix}`,
   key,
   payload
})


export const POP = 'POP'
export const pop = (suffix) => ({
   type: `${POP}_${suffix}`
})

export const POP_TO_KEY = 'POP_TO_KEY'
export const popToKey = (suffix, key) => ({
   type: `${POP_TO_KEY}_${suffix}`,
   key
})

export const POP_TO_INDEX = 'POP_TO_INDEX'
export const popToIndex = (suffix, index) => ({
   type: `${POP_TO_INDEX}_${suffix}`,
   index
})


export const REMOVE_BY_KEY = 'REMOVE_BY_KEY'
export const removeByKey = (suffix, key) => ({
   type: `${REMOVE_BY_KEY}_${suffix}`,
   key
})

export const REMOVE_ALL = 'REMOVE_ALL'
export const removeAll = (suffix) => ({
   type: `${REMOVE_ALL}_${suffix}`,
})


export const initializeStack = (suffix, stackKey) => {

   const partialSuffix = partialApply(suffix)

   return {
      push: partialSuffix(push),
      pop: partialSuffix(pop),
      popToKey: partialSuffix(popToKey),
      popToIndex: partialSuffix(popToIndex),
      removeByKey: partialSuffix(removeByKey),
      removeAll: partialSuffix(removeAll),
      createReducer: createStackReducer(suffix, stackKey)
   }
}

export const defaultStackKey = 'stack'


const createStackReducer = (suffix = '', stackKey = defaultStackKey) => {

   const itemsEnd = state => state.get(stackKey).size === 0

   return (initialState = {}) => {

      if(!initialState[stackKey]){
         initialState[stackKey] = []
      }

      return (state = fromJS(initialState), action) => {

         switch (action.type) {
            case `${PUSH}_${suffix}` :
               const hasItem = state.get(stackKey).find((value) => value.get('key') === action.key)
               if (hasItem) {
                  return state
               }
               const index = state.get(stackKey).size
               const item = fromJS({key: action.key, payload: action.payload, index})
               return state.updateIn([stackKey], list => list.push(item))

            case `${POP}_${suffix}` :
               return itemsEnd(state) ? state : state.updateIn([stackKey], list => list.pop())

            case `${POP_TO_KEY}_${suffix}`:
               const lastIndex = state.get(stackKey).findLastIndex((item) => item.get('key') === action.key)
               if (lastIndex === -1) return state
               return itemsEnd(state) ? state : state.updateIn([stackKey], list => list.take(lastIndex + 1))

            case `${POP_TO_INDEX}_${suffix}`:
               return itemsEnd(state) ? state : state.updateIn([stackKey], list => list.take(action.index + 1))

            case `${REMOVE_ALL}_${suffix}`:
               return state.update(stackKey, list => list.clear())

            case `${REMOVE_BY_KEY}_${suffix}`:
               return itemsEnd(state)
                  ? state
                  : state.updateIn([stackKey], list => list.filter((item) => item.get('key') !== action.key))

            default:
               return state
         }
      }
   }
}
