<template>
    <v-container> 
        <div>
            Welcome {{ dispatch.email }} || <a @click="onLogout()" href="#" >Logout</a>
        </div>
    </v-container>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'AuthHeader',
    computed : {
        ...mapGetters(['dispatch'])
    },
    methods : {
        ...mapActions(['cleanUp']),
        onLogout(){
            this.cleanUp();
        }
    }
}
</script>
<style scoped>

</style>