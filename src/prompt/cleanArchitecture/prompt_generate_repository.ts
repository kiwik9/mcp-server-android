export function generateRepositoryPrompt(androidModuleApp: string, documentationPath: string): string {
    return `
    Objetivo: Generar un repositorio para la capa de datos siguiendo Clean Architecture en Android.

    1. Debes crear en primera instancia la interface FeatureNameServiceDS con funciones suspendidas para cada método REST que se haya generado anteriormente, en la ruta ${androidModuleApp}/FeatureName/data/api/FeatureNameServiceDS.kt.
    Posteriormente, debes crear la clase FeatureNameServiceDSImpl que implementa la interfaz FeatureNameServiceDS, en la ruta ${androidModuleApp}/FeatureName/data/api/network/repository/FeatureNameServiceDSImpl.kt.

    2. Debes crear la interface FeatureNameRepository en la ruta ${androidModuleApp}/FeatureName/domain/repository/FeatureNameRepository.kt que tendrá las funciones suspendidas correspondientes a los métodos creados en FeatureNameServiceDS.
    3. Luego de crear la interfaz FeatureNameRepository, debes implementar la clase FeatureNameRepositoryImpl en la ruta ${androidModuleApp}/FeatureName/data/repository/FeatureNameRepositoryImpl.kt que implementa la interfaz FeatureNameRepository.

    Sigue estrictamente las convenciones definidas en:
    ${documentationPath}/CleanArchitectureGuide.md
    ${documentationPath}/CodeStyling.md

    Ejemplo de las clases e interfaces a crear:

    // FeatureNameServiceDS.kt
    interface FeatureNameServiceDS {
        suspend fun getUserProfile(): UserProfileResponse
    }

    // FeatureNameServiceDSImpl.kt
    class FeatureNameServiceDSImpl(private val api: FeatureNameApi) : FeatureNameServiceDS {
        override suspend fun getUserProfile(): UserProfileResponse {
            return api.getUserProfile()
        }  
    }

    // FeatureNameRepository.kt
    interface FeatureNameRepository {
        suspend fun getUserProfile(): UserProfile
    }   

    // FeatureNameRepositoryImpl.kt y su mapper correspondiente
    class FeatureNameRepositoryImpl(private val serviceDS: FeatureNameServiceDS) : FeatureNameRepository {
        override suspend fun getUserProfile(): UserProfile {
            val userProfile = serviceDS.getUserProfile()
            return userProfile.toUserProfile() // Aquí se usa un mapper para convertir a la entidad del dominio
        }
    }

    `;
}