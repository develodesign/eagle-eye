/**
 * Grunt tasks
 *
 * @copyright   (c) Develo Design 2015
 * @author      paul
 * @package     eagle-eye
 * @date        06/07/15
 */

module.exports = function( grunt ){

	grunt.initConfig({

		pkg: grunt.file.readJSON( 'package.json' ),

		bump: {

			options: {

				createTag: false,

				commit: false,

				files: [

					'package.json',

					'bower.json'
				],

				push: false,

				updateConfigs: ['pkg']
			}
		},

		sass: {

			dist: {

				files: {

					'example/styles/app.css': 'example/styles/app.scss'
				}
			}
		},

		uglify: {

			my_target: {

				files: {

					'scripts/eagle-eye.min.js': ['scripts/eagle-eye.js']
				}
			}
		},

		watch: {

			css: {

				files: '**/*.scss',

				tasks: ['sass']
			},

			scripts: {

				files: 'scripts/eagle-eye.js',

				tasks: ['uglify']
			}
		}
	});

	grunt.loadNpmTasks( 'grunt-bump' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );
	grunt.loadNpmTasks( 'grunt-contrib-sass' );
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );


};

