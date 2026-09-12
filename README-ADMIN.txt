TFM NEWS — Admin panelli sürüm

Admin adresi:
https://SENIN-SITEN.netlify.app/admin/

ÖNEMLİ: Admin panelin canlı sitede içerik değiştirebilmesi için site GitHub deposuna bağlı olmalı.

KURULUM ÖZETİ
1. GitHub'da "tfm-news" adında bir repository oluştur.
2. Bu ZIP'in içindeki TÜM dosyaları repository'ye yükle.
3. admin/config.yml dosyasında:
   repo: YOUR_GITHUB_USERNAME/tfm-news
   satırındaki YOUR_GITHUB_USERNAME kısmını kendi GitHub kullanıcı adınla değiştir.
4. Netlify'da bu GitHub repository'sini yeni site olarak deploy et / mevcut projeyi repo'ya bağla.
5. GitHub OAuth uygulaması oluştur:
   Callback URL: https://api.netlify.com/auth/done
6. Netlify:
   Project configuration > Access & security > OAuth
   bölümünden GitHub provider'ı ekle ve Client ID + Client Secret gir.
7. Sonra /admin/ adresine girip GitHub ile oturum aç.
8. "Ana sayfa ve haberler" bölümünden içeriği düzenle ve Publish/Save yap.
   Değişiklik GitHub'a yazılır, Netlify otomatik yeniden yayınlar.

Site içerikleri content/site.json dosyasındadır.
Admin paneli bu dosyayı form üzerinden düzenler.
