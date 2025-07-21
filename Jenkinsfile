pipeline {
    agent any

    //environment {
        // Opcional: puedes poner tu entorno de prueba aquí
       // NODE_ENV = 'dev'
    //}
    parameters {
        string(name: 'NODE_ENV', defaultValue: 'dev', description: 'Node environment to use')
    }
    environment {
        NODE_ENV = "${params.NODE_ENV}"
    }

    tools {
        nodejs 'NodeJS_20' // Asegúrate de que esté configurado en Jenkins (Manage Jenkins → Global Tool Configuration)
    }

    stages {
        stage('Install dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test -g "test personal"'
            }
        }

        stage('Archive Report') {
            steps {
                archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            }
        }
    }

    post {
        //always {
            // Generar y publicar reporte HTML de Playwright si lo tienes habilitado
            //sh 'npx playwright show-report'
        //}
        always {
      archiveArtifacts artifacts: 'test-results/*.webm', fingerprint: true
    }
        failure {
            mail to: 'osvaldo.perez@itw.mx',
                 subject: "Playwright Tests Failed in ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 body: "See details: ${env.BUILD_URL}"
        }
        success {
            echo "✅ Playwright tests passed correctamente."
        }
    }
}
