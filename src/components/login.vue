<template>
    <div>
        <form>
            <h2>Login</h2>
            <div class="input-field">
                <input type="text" v-model="username" placeholder="Enter Username">
            </div>
            <div class="input-field">
                <input type="password" v-model="password" placeholder="Enter Password">
            </div>
            <input type="submit" value="LogIn" v-on:click="submitForm()">
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        submitForm() {
            fetch('https://tarea-2-sistemas-distribuidos.netlify.app/.netlify/functions/app/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: this.username,
                    password: this.password
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Agrega esta línea para verificar la respuesta recibida
                    if (data.success) {
                        console.log("SUCCESS", data.status);
                        this.$router.push('/home');
                    } else {
                        console.error("ERROR",data.error);
                    }
                })
                .catch(error => {
                    console.error("Error2",error);
                });

        }
    }
};
</script>
  