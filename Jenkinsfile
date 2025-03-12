pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Docker Resources') {
            steps {
                sh 'docker system prune -a --volumes -f'
                sh 'docker builder prune -a -f'
            }
        }

        stage('Build Project') {
            steps {
                sh '''
                    docker-compose down
                    docker-compose up -d --build
                '''
            }
        }
    }

    post {
        success {
            echo 'Build project success!'
        }
        failure {
            echo 'Build project failed!'
        }
    }
}