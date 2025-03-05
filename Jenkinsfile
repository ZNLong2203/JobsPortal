pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
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