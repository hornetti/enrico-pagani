module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'src/sass/',
					src: '*.scss',
					dest: 'build/css/',
					ext: '.css'
				}]
			}
		},
		twigRender: {
			twig_task : {
				files: [
				{
				    data: "src/json/bio.json",
				    expand: true,
				    cwd: "src/twig/",
				    src: ["*.twig"],
				    dest: "build/",
				    ext: ".html"
				}]
			}			
		},
		autoprefixer: {
			compile: {
				files: {
				  'build/css/style.css': 'build/css/style.css'
				},
			},
		},
		cssmin: {
			clean: {
				files: {
				  'build/css/style.css': 'build/css/style.css'
				}
			}
		},
		watch: {
			sass: {
				files: [ 'src/sass/*.scss' ],
				tasks: ['sass', 'autoprefixer', 'cssmin']
			},
			twig: {
				files: [ 'src/twig/*.twig' ],
				tasks: [ 'twigRender' ]
			},
		},
		browserSync: {
			bsFiles: {
				src: [ 'build/css/*.css', 'build/*.html']
			},
			options: {
				watchTask: true,
				server: {
					baseDir: 'build'
				},
			},
		},
	});

	// Load grunt plugins.
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-twig-render');

	grunt.registerTask('start', ['default', 'browserSync', 'watch']);
	grunt.registerTask('default', ['sass', 'autoprefixer', 'cssmin', 'twigRender']);
};