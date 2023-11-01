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
            fetch(this.url + '/.netlify/functions/app/user', {
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
                    if (data.success) {
                        console.log("SUCCESS", data.status);
                        this.$router.push('/home');
                    } else {
                        console.error(data.error);
                    }
                })
                .catch(error => {
                    console.error(error);
                });

        }
    }
};
</script>
  