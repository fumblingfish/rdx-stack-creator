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
} = initializeStack('MY_STACK', 'items')

export default createReducer({})

export const listSelector = {
   getItems: (state) => state.listReducer.get('items')
}

```
