  import adapter from '@sveltejs/adapter-static';                                                    
  import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';                                     
                                                                                                     
  const config = {                                                                                   
      preprocess: vitePreprocess(),                                                                  
      kit: {                                                                                         
          adapter: adapter({                                                                         
              pages: 'build',                                                                        
              assets: 'build',                                                                       
              fallback: 'index.html'                                                                 
          }),                                                                                        
          alias: {                                                                                   
              $components: 'src/lib/components',                                                     
              $lib: 'src/lib',                                                                       
              $data: 'src/lib/data',                                                                 
              $utils: 'src/lib/utils',                                                               
              $stores: 'src/lib/stores'                                                              
          }                                                                                          
      }                                                                                              
  };                                                                                                 
                                                                                                     
  export default config;  