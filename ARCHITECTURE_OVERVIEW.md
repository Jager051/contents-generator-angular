# 🏗️ Proje Mimari Özeti

Bu doküman, **Contents Generator** projesinin tam mimarisini açıklamaktadır.

## 📁 Proje Yapısı

```
/Users/olgu/
├── contents-generator-angular/    # Frontend (Angular 20)
└── webapi-RepositoryDesignPattern/ # Backend (.NET 6 Web API)
```

---

## 🎨 Frontend Mimarisi (Angular)

### Teknoloji Stack
- **Framework**: Angular 20.3.0 (Standalone Components)
- **Routing**: Lazy Loading ile modüler route yapısı
- **State Management**: RxJS BehaviorSubject (servis tabanlı)
- **HTTP**: HttpClient + Interceptors
- **UI Framework**: Angular Material + Tailwind CSS
- **Styling**: SCSS + Tailwind CSS

### Klasör Yapısı

```
src/app/
├── core/                          # Core modüller (tekrar kullanılabilir)
│   ├── components/               # Global componentler
│   │   ├── footer/
│   │   ├── glass-card/
│   │   ├── header/
│   │   ├── image-with-fallback/
│   │   └── popup/                # Global popup sistemi
│   ├── interceptors/
│   │   └── auth.interceptor.ts   # JWT token ekleme
│   ├── models/
│   │   ├── auth.model.ts
│   │   └── generic-response.model.ts
│   └── services/
│       ├── dark-mode.service.ts
│       └── popup.service.ts      # Global popup yönetimi
│
├── features/                      # Feature-based modüller
│   ├── auth/                     # Authentication modülü
│   │   ├── components/
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── forgot-password/
│   │   │   └── reset-password/
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   └── auth.routes.ts
│   │
│   ├── dashboard/                # Ana dashboard modülü
│   │   ├── components/
│   │   │   ├── home/            # Dashboard ana sayfa
│   │   │   ├── workflow-list/   # Workflow listesi
│   │   │   ├── calendar-view/   # Takvim görünümü
│   │   │   ├── history-view/    # Geçmiş görünümü
│   │   │   ├── settings-view/   # Ayarlar
│   │   │   ├── sidebar/         # Yan menü
│   │   │   ├── new-project/     # Yeni proje modal
│   │   │   ├── preview-panel/   # Önizleme paneli
│   │   │   ├── quick-actions/   # Hızlı aksiyonlar
│   │   │   └── telegram-connect/
│   │   ├── services/
│   │   │   └── dashboard.service.ts
│   │   ├── dashboard.model.ts   # TypeScript modelleri
│   │   └── dashboard.routes.ts
│   │
│   └── landing/                  # Landing page modülleri
│       ├── landing-page/
│       ├── about-page/
│       ├── examples-page/
│       └── pricing-page/
│
├── environments/
│   ├── environment.ts           # Development config
│   └── environment.prod.ts      # Production config
│
├── app.config.ts                # Angular app configuration
├── app.routes.ts                # Ana route tanımları
└── app.ts                       # Root component
```

### Mimari Prensipler

#### 1. **Feature-Based Module Structure**
Her feature kendi modülünde:
- Components
- Services
- Models
- Routes

#### 2. **Service-Based State Management**
```typescript
// Örnek: AuthService
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
}
```

#### 3. **HTTP Interceptors**
- `authInterceptor`: JWT token'ı otomatik ekler
- Tüm HTTP isteklerine Bearer token eklenir

#### 4. **Generic Response Handling**
```typescript
// Tüm API response'ları GenericResponse formatında
interface GenericResponse<T> {
  isSuccess: boolean;
  message: string;
  value?: T;
  validationErrors?: ValidationError[];
}
```

#### 5. **Lazy Loading**
```typescript
// Route tanımları lazy loading ile
{
  path: 'dashboard',
  loadChildren: () => import('./features/dashboard/dashboard.routes')
}
```

### Önemli Servisler

#### AuthService
- Login/Register
- Token yönetimi (localStorage)
- CurrentUser observable
- Token validation

#### DashboardService
- Workflow CRUD işlemleri
- Dashboard overview
- Calendar data
- Workflow listesi

#### PopupService
- Global popup yönetimi
- Success/Error/Warning/Info mesajları
- Auto-close desteği

---

## 🔧 Backend Mimarisi (.NET 6 Web API)

### Teknoloji Stack
- **Framework**: ASP.NET Core 6.0
- **Database**: MySQL (Dapper)
- **Caching**: Redis
- **Authentication**: JWT Bearer Token
- **Pattern**: Clean Architecture + Repository Pattern + Orchestrator Pattern

### Katmanlı Mimari

```
WebAPI-RepositoryDesignPattern/
│
├── WebAPI.API/                  # 🌐 Presentation Layer
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── DashboardController.cs
│   │   ├── WorkflowsController.cs
│   │   └── CacheController.cs
│   └── Program.cs              # DI & Middleware
│
├── WebAPI.Core/                 # 📦 Domain Layer
│   ├── Entities/               # Domain models
│   │   ├── User.cs
│   │   ├── Workflow.cs
│   │   ├── WorkflowStep.cs
│   │   ├── WorkflowAsset.cs
│   │   └── BaseEntity.cs
│   ├── DTOs/                   # Data Transfer Objects
│   │   ├── AuthDto.cs
│   │   ├── DashboardDto.cs
│   │   └── GenericResponse.cs
│   └── Interfaces/             # Repository & Service interfaces
│       ├── IRepository.cs
│       ├── IUnitOfWork.cs
│       ├── IAuthService.cs
│       ├── IDashboardService.cs
│       └── IOrchestrator.cs
│
├── WebAPI.Infrastructure/       # 💾 Data Access Layer
│   ├── Data/
│   │   └── DapperContext.cs    # Dapper connection
│   ├── Repositories/
│   │   ├── GenericRepository.cs
│   │   ├── UserRepository.cs
│   │   ├── WorkflowRepository.cs
│   │   └── UnitOfWork.cs
│   └── Services/
│       ├── RedisCacheService.cs
│       └── EmailService.cs
│
└── WebAPI.Services/             # 🎯 Business Logic Layer
    ├── Services/
    │   ├── AuthService.cs
    │   └── DashboardService.cs
    └── Orchestrators/          # ⭐ Orchestrator Pattern
        ├── Auth/
        │   ├── LoginOrchestrator.cs
        │   ├── RegisterOrchestrator.cs
        │   ├── ForgotPasswordOrchestrator.cs
        │   └── ResetPasswordOrchestrator.cs
        ├── Dashboard/
        │   ├── DashboardOverviewOrchestrator.cs
        │   ├── CreateWorkflowOrchestrator.cs
        │   ├── UpdateWorkflowOrchestrator.cs
        │   ├── WorkflowListOrchestrator.cs
        │   └── CalendarOrchestrator.cs
        └── OrchestratorBase.cs
```

### Mimari Pattern'ler

#### 1. **Repository Pattern**
```csharp
// Generic Repository (temel CRUD)
IRepository<T>

// Custom Repository (özel sorgular)
IWorkflowRepository : IRepository<Workflow>
{
    Task<IEnumerable<Workflow>> GetActiveWorkflowsAsync(int userId);
    Task<Workflow?> GetWorkflowWithStepsAsync(int id);
}

// Unit of Work (transaction yönetimi)
IUnitOfWork
{
    IWorkflowRepository Workflows { get; }
    IUserRepository Users { get; }
    Task SaveChangesAsync();
    Task BeginTransactionAsync();
}
```

#### 2. **Orchestrator Pattern** ⭐
Karmaşık işlemleri koordine eder:

```
Controller
    ↓
Service (Cache yönetimi)
    ↓
Orchestrator (Business logic + Transaction + Mapping)
    ↓
UnitOfWork → Repository → Database
```

**Orchestrator Örneği:**
```csharp
public class CreateWorkflowOrchestrator : IOrchestrator<CreateWorkflowRequestDto, WorkflowSummaryDto>
{
    public async Task<OrchestratorResult<WorkflowSummaryDto>> ExecuteAsync(
        CreateWorkflowRequestDto input)
    {
        // 1. Entity mapping
        var workflow = MapToEntity(input);
        
        // 2. Business rules validation
        // 3. Transaction management
        // 4. Repository calls
        // 5. DTO mapping
        
        return OrchestratorResult<WorkflowSummaryDto>.SuccessResult(dto);
    }
}
```

#### 3. **Clean Architecture Katmanları**

##### API Layer (Controllers)
- **Sorumluluk**: HTTP isteklerini alır, Service'leri çağırır
- **Bağımlılık**: Service Layer

##### Service Layer
- **Sorumluluk**: 
  - ✅ Orchestrator koordinasyonu
  - ✅ Cache yönetimi (Redis)
  - ✅ Hata yönetimi
- **Yapmaz**: Direkt veri erişimi (Orchestrator'a delege eder)

##### Orchestrator Layer
- **Sorumluluk**:
  - ✅ Business rules koordinasyonu
  - ✅ Transaction yönetimi
  - ✅ Veri erişimi (UnitOfWork üzerinden)
  - ✅ Entity-DTO mapping

##### Business Rules Layer
- **Sorumluluk**: Domain validasyonları, iş kuralları
- **Prensip**: Single Responsibility (her rule tek bir şeyi kontrol eder)

##### Repository Layer
- **Sorumluluk**: Veri erişimi, CRUD, Custom queries

### Veri Akışı

#### Query (Read) İşlemi
```
Controller
    ↓
Service (cache check)
    ↓
Query Orchestrator
    ↓
UnitOfWork → Repository → Database
    ↓
Entity → DTO (Orchestrator'da mapping)
    ↓
Service (cache set)
    ↓
Controller → Response
```

#### Command (Write) İşlemi
```
Controller
    ↓
Service
    ↓
Command Orchestrator
    ↓
Business Rules (validasyon)
    ↓
Transaction Start
    ↓
UnitOfWork → Repository → Database
    ↓
Transaction Commit/Rollback
    ↓
Service (cache invalidate)
    ↓
Controller → Response
```

### Database Yapısı

#### Ana Entity'ler

**User**
- id, username, email, password (BCrypt)
- firstName, lastName
- isActive, createdAt, updatedAt

**Workflow**
- id, name, description
- status (active/paused/error)
- frequency (daily/weekly/monthly)
- triggerType, triggerTime
- ownerUserId, isPrimary
- lastRunAt, nextRunAt
- videosCreated
- activeStepSequence

**WorkflowStep**
- id, workflowId
- title, description, icon
- stepType, sequence
- status (completed/active/pending)

**WorkflowAsset**
- id, workflowId
- assetType (script/music/video)
- title, status, summary
- previewUrl, durationSeconds

### API Endpoints

#### Auth Endpoints
- `POST /api/auth/login`
- `POST /api/auth/register`
- `POST /api/auth/logout`
- `GET /api/auth/user`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`

#### Dashboard Endpoints
- `GET /api/dashboard/overview`
- `GET /api/dashboard/calendar?year=X&month=Y`

#### Workflow Endpoints
- `GET /api/workflows` (search query ile)
- `GET /api/workflows/{id}`
- `POST /api/workflows`
- `PUT /api/workflows/{id}`
- `PUT /api/workflows/{id}/status?status=X`

### Cache Stratejisi (Redis)

**Cache Keys:**
- `products:*` - Ürün cache'leri
- `user:{id}` - Kullanıcı cache'leri
- `dashboard:overview:{userId}` - Dashboard cache

**Cache Süreleri:**
- List queries: 10 dakika
- Detail queries: 15 dakika
- Write işlemlerinde: Cache invalidation

---

## 🔄 Frontend-Backend İletişimi

### API Base URL
```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001/api'
};
```

### Authentication Flow
1. User login/register → Backend JWT token döner
2. Token localStorage'a kaydedilir
3. `authInterceptor` her istekte token'ı header'a ekler
4. Backend JWT Bearer middleware ile doğrular

### Response Format
Tüm API response'ları `GenericResponse<T>` formatında:
```typescript
{
  isSuccess: boolean;
  message: string;
  value?: T;
  validationErrors?: ValidationError[];
  timestamp: string;
}
```

### Error Handling
- Backend: `GenericResponse<T>.Failure()` veya `ValidationFailure()`
- Frontend: `GenericResponseHelper` ile kontrol ve hata gösterimi

---

## 📋 Yeni Feature Eklerken Checklist

### Backend

#### 1. Entity Ekleme
- [ ] `WebAPI.Core/Entities/` altında entity oluştur
- [ ] `BaseEntity`'den türet
- [ ] Database migration ekle

#### 2. Repository Ekleme
- [ ] `WebAPI.Core/Interfaces/` altında interface oluştur
- [ ] `WebAPI.Infrastructure/Repositories/` altında implement et
- [ ] `UnitOfWork`'e ekle

#### 3. DTO Ekleme
- [ ] `WebAPI.Core/DTOs/` altında DTO oluştur
- [ ] Entity-DTO mapping için extension methods

#### 4. Orchestrator Ekleme
- [ ] `WebAPI.Services/Orchestrators/` altında orchestrator oluştur
- [ ] `IOrchestrator<TInput, TOutput>` implement et
- [ ] Business rules ekle (gerekirse)

#### 5. Service Ekleme
- [ ] `WebAPI.Services/Services/` altında service oluştur
- [ ] Orchestrator'ları NEW ile oluştur
- [ ] Cache yönetimi ekle

#### 6. Controller Ekleme
- [ ] `WebAPI.API/Controllers/` altında controller oluştur
- [ ] Service'i inject et
- [ ] `[Authorize]` attribute ekle (gerekirse)

#### 7. DI Kaydı
- [ ] `Program.cs`'de servisleri kaydet

### Frontend

#### 1. Model Ekleme
- [ ] Feature klasöründe `.model.ts` dosyası oluştur
- [ ] TypeScript interface/type tanımları

#### 2. Service Ekleme
- [ ] Feature klasöründe `services/` altında service oluştur
- [ ] HttpClient ile API çağrıları
- [ ] `GenericResponseHelper` ile response handling

#### 3. Component Ekleme
- [ ] Feature klasöründe `components/` altında component oluştur
- [ ] Standalone component olarak tanımla
- [ ] Service'i inject et

#### 4. Route Ekleme
- [ ] Feature klasöründe route tanımları
- [ ] Ana `app.routes.ts`'e lazy loading ile ekle

---

## 🎯 Mimari Prensipler

### SOLID Prensipleri

1. **Single Responsibility**: Her katman/class tek bir sorumluluğa sahip
2. **Open/Closed**: Extension ile genişletilebilir, değiştirilemez
3. **Liskov Substitution**: Interface'ler doğru kullanılmış
4. **Interface Segregation**: Küçük, özel interface'ler
5. **Dependency Inversion**: Dependency Injection kullanılmış

### Design Patterns

✅ **Repository Pattern**: Veri erişim soyutlaması
✅ **Unit of Work**: Transaction yönetimi
✅ **Orchestrator Pattern**: Karmaşık işlem koordinasyonu
✅ **Business Rules Pattern**: Modüler validasyon
✅ **Dependency Injection**: Loose coupling

---

## 🚀 Geliştirme Notları

### Backend
- Tüm servisler `async/await` kullanır
- Transaction yönetimi `UnitOfWork` ile
- Cache stratejisi Redis ile
- Hata yönetimi `GenericResponse` ile

### Frontend
- Standalone components kullanılır
- Lazy loading ile performans optimizasyonu
- RxJS ile reactive programming
- TypeScript strict mode

---

## 📚 İlgili Dökümanlar

### Backend
- `README.md` - Genel proje bilgisi
- `CLEAN_ARCHITECTURE_LAYERS.md` - Katmanlı mimari detayları
- `BUSINESS_RULES_ORCHESTRATOR_PATTERN.md` - Orchestrator pattern
- `API_ENDPOINTS.md` - API endpoint listesi
- `DATABASE_SCHEMA.md` - Database şema bilgisi

### Frontend
- `package.json` - Dependency listesi
- `angular.json` - Angular configuration
- `tailwind.config.js` - Tailwind configuration

---

**Son Güncelleme**: 2024
**Versiyon**: 1.0

