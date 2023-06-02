import { firestore } from 'firebase';

const collName = 'product';

const properties = {
    namespaced: true,
    state: {
        properties: [],
    },
    getters: {
        getProperties: (state) => {
            return state.properties;
        }
    },
    mutations: {
        SET_PROPERTIES(state, properties) {
            state.properties = properties;
        },
        ADD_PROPERTY(state, property) {
            state.properties.push(property);
        },
        UPDATE_PROPERTY(state, payload) {
            Object.assign(state.properties[payload.index], payload.property);
        },
        REMOVE_PROPERTY(state, property) {
            const index = state.properties.indexOf(property);
            state.properties.splice(index, 1);
        }
    },
    actions: {
        async addProperty({commit}, property) {
            const docRef = await firestore().collection(collName).add(property);
            property.id = docRef.id;
            commit('ADD_PROPERTY', property);
        },
        async loadProperties({commit}) {
            const querySnapshot = await firestore().collection(collName).get();
            let property;
            let properties = querySnapshot.docs.map(function (doc) {
                property = doc.data();
                property.id = doc.id;
             //  property.property = doc.property;'
           
                return property;
            });
            commit('SET_PROPERTIES', properties);
        },
        async updateProperty({commit}, payload) {
            await firestore().collection(collName).doc(payload.property.id).set(payload.property);
            commit('UPDATE_PROPERTY', payload);
        },
        async removeProperty({commit}, property) {
            await firestore().collection(collName).doc(property.id).delete();
            commit('REMOVE_PROPERTY', property);
        }
    }
}

export default properties;