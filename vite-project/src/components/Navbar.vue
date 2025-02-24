<template>
    <nav class="navbar">
        <div class="logo">
            <router-link to="/">FactFever</router-link>
        </div>
        <ul class="navbar-links">
            <li>
                <router-link to="/" class="navbar-link" :class="{ active : isActive('/')}">Home</router-link>
            </li>
            <li>
                <router-link to="/results" class="navbar-link" :class="{ active : isActive('/results')}">Results</router-link>
            </li>
        </ul>
    </nav>
</template>



<script>
export default {
    name: 'Navbar',
    methods: {
        isActive(route) {
            return this.$route.path === route
        }
    }
}
</script>

<style scoped>

.navbar {
    background-color: #ADD8E6;
    width: 100%;
    box-sizing: border-box;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    padding: 10px;
    text-align: center;
}

.logo a {
    text-decoration: none;
    color: #00008B;
}

.navbar-links {
    display: flex;
    list-style: none;
    align-items: center;
    padding: 10px;
    justify-content: center;
    margin: 10px 5px;
    gap: 10px;
}

.navbar-link {
    color: #FFF;
    text-decoration: none;
    font-size: 18px;
    padding: 5px;
}


.navbar-link:not(.active) {
    text-shadow:-1px -1px 0 #00008B,  1px -1px 0 #00008B,
    -1px  1px 0 #00008B,  1px  1px 0 #00008B,
    0px -1px 0 #00008B,   0px  1px 0 black,
    -1px  0px 0 #00008B,   1px  0px 0 #00008B;
}

.navbar-link:hover {
    color: #00008B;
    border: 1px solid #FFF;
    text-shadow: none;
}

.navbar-link.active {
    color: #00008B;
    font-weight: bold;
    border: 2px solid #00008B;
}
</style>
