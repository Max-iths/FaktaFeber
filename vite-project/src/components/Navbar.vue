<template>
    <nav class="navbar>
        <div class="logo">
            <router-link to="/">FaktaFeber</router-link>
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
    background-color: #00008B;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
</style>
