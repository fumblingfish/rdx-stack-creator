import {initializeStack} from './index';
import {fromJS} from 'immutable';

const TEST_SUFFIX = 'TEST_SUFFIX'
const stackKey = 'items'

const {
   push,
   pop,
   popToKey,
   popToIndex,
   removeByKey,
   removeAll,
   createReducer
} = initializeStack('TEST_SUFFIX', stackKey)


const reducer = createReducer({})


describe('stackReducer', ()=>{


   function stateBefore(){
      return fromJS({
         items:[{
            index: 0,
            key: "A",
            payload:{title:'Title A'}
         },{
            index: 1,
            key: "B",
            payload:{title:'Title B'}
         },{
            index: 2,
            key: "C",
            payload:{title:'Title C'}
         }]
      })
   }

   it('should push to stack', () => {
      const action = push('D', {title:'Title D'})
      const actualState = reducer(stateBefore(), action).toJS()
      const expectedState = {
         items:[{
            index: 0,
            key: "A",
            payload:{title:'Title A'}
         },{
            index: 1,
            key: "B",
            payload:{title:'Title B'}
         },{
            index: 2,
            key: "C",
            payload:{title:'Title C'}
         },{
            index: 3,
            key: "D",
            payload:{title:'Title D'}
         }]
      }
      expect(actualState).toEqual(expectedState)
   })


   it('should pop from stack', () => {
      const action = pop()
      const actualState = reducer(stateBefore(), action).toJS()
      const expectedState = {
         items:[{
            index: 0,
            key: "A",
            payload:{title:'Title A'}
         },{
            index: 1,
            key: "B",
            payload:{title:'Title B'}
         }]
      }
      expect(actualState).toEqual(expectedState)
   })

   it('should pop to neareset key', () => {
      const action = popToKey('B')
      const actualState = reducer(stateBefore(), action).toJS()
      const expectedState = {
         items:[{
            index: 0,
            key: "A",
            payload:{title:'Title A'}
         },{
            index: 1,
            key: "B",
            payload:{title:'Title B'}
         }]
      }
      expect(actualState).toEqual(expectedState)
   })

   it('should return current state on missing key', () => {
      const action = popToKey('NONE')
      const actualState = reducer(stateBefore(), action).toJS()
      const expectedState = {
         items:[{
            index: 0,
            key: "A",
            payload:{title:'Title A'}
         },{
            index: 1,
            key: "B",
            payload:{title:'Title B'}
         },{
            index: 2,
            key: "C",
            payload:{title:'Title C'}
         }]
      }
      expect(actualState).toEqual(expectedState)
   })


   it('should pop to index', () => {
      const action = popToIndex(1)
      const actualState = reducer(stateBefore(), action).toJS()
      const expectedState = {
         items:[{
            index: 0,
            key: "A",
            payload:{title:'Title A'}
         },{
            index: 1,
            key: "B",
            payload:{title:'Title B'}
         }]
      }
      expect(actualState).toEqual(expectedState)
   })

   it('should return current state if index is larger or same as stack size', () => {
      const action = popToIndex(2)
      const actualState = reducer(stateBefore(), action).toJS()
      const expectedState = {
         items:[{
            index: 0,
            key: "A",
            payload:{title:'Title A'}
         },{
            index: 1,
            key: "B",
            payload:{title:'Title B'}
         },{
            index: 2,
            key: "C",
            payload:{title:'Title C'}
         }]
      }
      expect(actualState).toEqual(expectedState)
      const action2 = popToIndex(3)
      const actualState2 = reducer(stateBefore(), action2).toJS()
      expect(actualState2).toEqual(expectedState)
   })

   it('should remove by key', () => {
      const action = removeByKey('B')
      const actualState = reducer(stateBefore(), action).toJS()
      const expectedState = {
         items:[{
            index: 0,
            key: "A",
            payload:{title:'Title A'}
         },{
            index: 2,
            key: "C",
            payload:{title:'Title C'}
         }]
      }
      expect(actualState).toEqual(expectedState)
   })

   it('should remove all items in stack', () => {
      const action = removeAll()
      const actualState = reducer(stateBefore(), action).toJS()
      const expectedState = {
         items:[]
      }
      expect(actualState).toEqual(expectedState)
   })



})


