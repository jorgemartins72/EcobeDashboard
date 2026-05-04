<template>
  <div class="tracking-tight select-none">

            <div class="flex flex-col w-[350px] max-w-[450px]">
                <p class="text-2xl font-semibold">Login</p>
                <div class="mt-8">
                  <ButtonGoogle />
                </div>
                <Divider label="Ou" />
                <div>

<FormKit type="repeater" label="My Movies" add-label="Add Movie">
  <FormKit
    name="movie"
    type="autocomplete"
    label="Search for a movie"
    placeholder="Ex: Interstellar"
    :options="searchMovies"
  />
  <FormKit type="rating" label="My rating" />
</FormKit>



                    <form novalidate="" class="mb-4">
                        <div class="grid gap-2">
                            <div class="grid gap-1"><label class="text-zinc-950 dark:text-white"
                                    for="email">Email</label><input
                                    class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                    id="email" placeholder="name@example.com" type="email" autocapitalize="none"
                                    autocomplete="email" autocorrect="off" name="email"><label
                                    class="text-zinc-950 mt-2 dark:text-white" for="password">Password</label><input
                                    id="password" placeholder="Password" type="password"
                                    autocomplete="current-password"
                                    class="mr-2.5 mb-2 h-full min-h-[44px] w-full rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-0 dark:border-zinc-800 dark:bg-transparent dark:text-white dark:placeholder:text-zinc-400"
                                    name="password"></div><button
                                class="whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 mt-2 flex h-[unset] w-full items-center justify-center rounded-lg px-4 py-4 text-sm font-medium"
                                type="submit">Sign in</button>
                        </div>
                    </form>
                    <p><a href="/dashboard/signin/forgot_password"
                            class="font-medium text-zinc-950 dark:text-white text-sm">Forgot your password?</a></p>
                    <p><a href="/dashboard/signin/email_signin"
                            class="font-medium text-zinc-950 dark:text-white text-sm">Sign in via magic link</a></p>
                    <p><a href="/dashboard/signin/signup"
                            class="font-medium text-zinc-950 dark:text-white text-sm">Don't
                            have an account? Sign up</a></p>
                </div>
            </div>

  </div>
</template>

<script setup>

</script>

<style>

</style>