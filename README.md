# rdx-stack-creator

```javascript
import {initializeStack} from 'rdx-stack-creator'

export const {
   push,
   pop,
   popToKey,
   popToIndex,
   removeByKey,
   removeAll,
   createReducer
} = initializeStack('MY_STACK', 'stack') // suffix, stackKey

const stackreducer = createReducer({}) // add initial state

export default stackreducer

export const stackSelector = {
   getItems: (state) => state.stackReducer.get('stack')
}

```
