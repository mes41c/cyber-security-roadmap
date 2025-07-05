document.addEventListener('DOMContentLoaded', () => {

    const skillsData = {
            'skill-blue-temel-1': { name: 'Siber Güvenlik Temelleri', level: 'temel', points: 10, prerequisites: [] },
            'skill-blue-temel-2': { name: 'Network Bilgisi', level: 'temel', points: 10, prerequisites: [] },
            'skill-blue-temel-3': { name: 'İşletim Sistemi Bilgisi', level: 'temel', points: 10, prerequisites: [] },
            'skill-blue-temel-4': { name: 'Güvenlik Araçları Farkındalığı', level: 'temel', points: 10, prerequisites: [] },
            'skill-blue-temel-5': { name: 'Bulut Bilişim Temelleri', level: 'temel', points: 10, prerequisites: [] },
            'skill-blue-temel-6': { name: 'Kimlik Yönetimi Kavramları', level: 'temel', points: 10, prerequisites: [] },
            'skill-blue-orta-1': { name: 'SOC Operasyonları (Tier 1/2)', level: 'orta', points: 25, prerequisites: ['skill-blue-temel-1', 'skill-blue-temel-4'] },
            'skill-blue-orta-2': { name: 'SIEM & Log Yönetimi', level: 'orta', points: 25, prerequisites: ['skill-blue-temel-2', 'skill-blue-temel-4'] },
            'skill-blue-orta-3': { name: 'Ağ Trafiği Analizi', level: 'orta', points: 25, prerequisites: ['skill-blue-temel-2'] },
            'skill-blue-orta-4': { name: 'Zafiyet Yönetimi', level: 'orta', points: 20, prerequisites: ['skill-blue-temel-1'] },
            'skill-blue-orta-5': { name: 'Uç Nokta Güvenliği (EDR)', level: 'orta', points: 25, prerequisites: ['skill-blue-temel-3'] },
            'skill-blue-orta-6': { name: 'Tehdit İstihbaratı (CTI)', level: 'orta', points: 20, prerequisites: ['skill-blue-temel-1'] },
            'skill-blue-uzman-1': { name: 'Proaktif Tehdit Avcılığı', level: 'uzman', points: 50, prerequisites: ['skill-blue-orta-1', 'skill-blue-orta-3'] },
            'skill-blue-uzman-2': { name: 'Dijital Adli Bilişim (DFIR)', level: 'uzman', points: 50, prerequisites: ['skill-blue-orta-1', 'skill-blue-temel-3'] },
            'skill-blue-uzman-3': { name: 'Zararlı Yazılım Analizi', level: 'uzman', points: 50, prerequisites: ['skill-blue-temel-3'] },
            'skill-blue-uzman-4': { name: 'Otomasyon (SOAR & Scripting)', level: 'uzman', points: 40, prerequisites: ['skill-red-temel-5'] },
            'skill-blue-uzman-5': { name: 'Bulut Güvenlik Mimarisi', level: 'uzman', points: 50, prerequisites: ['skill-blue-temel-5', 'skill-blue-temel-6'] },
            'skill-blue-uzman-6': { name: 'Yapay Zeka ve Güvenlik', level: 'uzman', points: 40, prerequisites: ['skill-blue-orta-1'] },
            'skill-red-temel-1': { name: 'Sızma Testi Metodolojileri', level: 'temel', points: 10, prerequisites: [] },
            'skill-red-temel-2': { name: 'Network Keşif', level: 'temel', points: 10, prerequisites: ['skill-blue-temel-2'] },
            'skill-red-temel-3': { name: 'Ev Laboratuvarı Kurulumu', level: 'temel', points: 10, prerequisites: [] },
            'skill-red-temel-4': { name: 'Web Teknolojileri', level: 'temel', points: 10, prerequisites: [] },
            'skill-red-temel-5': { name: 'Betik Dili Temelleri', level: 'temel', points: 10, prerequisites: [] },
            'skill-red-temel-6': { name: 'Sosyal Mühendislik Farkındalığı', level: 'temel', points: 10, prerequisites: [] },
            'skill-red-orta-1': { name: 'Web Uygulama Sızma Testleri', level: 'orta', points: 30, prerequisites: ['skill-red-temel-4'] },
            'skill-red-orta-2': { name: 'Sömürü (Exploitation)', level: 'orta', points: 25, prerequisites: ['skill-red-temel-2'] },
            'skill-red-orta-3': { name: 'Bug Bounty Faaliyetleri', level: 'orta', points: 20, prerequisites: ['skill-red-orta-1'] },
            'skill-red-orta-4': { name: 'Ağ İçi Sızma Testi', level: 'orta', points: 30, prerequisites: ['skill-red-temel-2', 'skill-blue-temel-3'] },
            'skill-red-orta-5': { name: 'Active Directory (AD) Temelleri', level: 'orta', points: 25, prerequisites: ['skill-red-orta-4'] },
            'skill-red-orta-6': { name: 'Parola Saldırıları', level: 'orta', points: 20, prerequisites: ['skill-blue-temel-3'] },
            'skill-red-uzman-1': { name: 'Savunma Atlatma (Evasion)', level: 'uzman', points: 50, prerequisites: ['skill-red-orta-2', 'skill-red-orta-4'] },
            'skill-red-uzman-2': { name: 'Gelişmiş AD Saldırıları', level: 'uzman', points: 50, prerequisites: ['skill-red-orta-5'] },
            'skill-red-uzman-3': { name: 'Exploit Geliştirme', level: 'uzman', points: 60, prerequisites: ['skill-red-temel-5'] },
            'skill-red-uzman-4': { name: 'Bulut Sızma Testleri', level: 'uzman', points: 50, prerequisites: ['skill-blue-temel-5', 'skill-red-orta-4'] },
            'skill-red-uzman-5': { name: 'Mobil Sızma Testleri', level: 'uzman', points: 40, prerequisites: ['skill-red-orta-1'] },
            'skill-red-uzman-6': { name: 'Donanım ve IoT Testleri', level: 'uzman', points: 40, prerequisites: [] }
        };

        // --- BEYİN 2: ROL-YETKİNLİK HARİTASI (GÜNCELLENDİ) ---
        // Artık roller, başka rolleri de miras alabilir.
        const roleToSkillsMap = {
            'role-soc-analyst': ['skill-blue-temel-1','skill-blue-temel-2','skill-blue-temel-3','skill-blue-temel-4','skill-blue-orta-1','skill-blue-orta-2','skill-blue-orta-3','skill-blue-orta-5'],
            'role-infosec-grc': ['skill-blue-temel-1','skill-blue-temel-4','skill-blue-temel-6','skill-blue-orta-4'],
            'role-jr-pentester': ['skill-red-temel-1','skill-red-temel-2','skill-red-temel-3','skill-red-temel-4','skill-red-temel-5','skill-red-orta-1','skill-red-orta-2'],
            'role-product-specialist': ['skill-blue-temel-2','skill-blue-temel-4','skill-blue-temel-6'],
            'role-pentester': ['role-jr-pentester', 'skill-red-orta-3', 'skill-red-orta-4','skill-red-orta-5','skill-red-orta-6'],
            'role-appsec': ['role-jr-pentester', 'skill-blue-uzman-4'],
            'role-dfir': ['role-soc-analyst', 'skill-blue-uzman-2','skill-blue-uzman-3'],
            'role-detection-eng': ['role-soc-analyst', 'skill-blue-uzman-1','skill-blue-uzman-4'],
            'role-threat-intel': ['role-soc-analyst','skill-red-temel-6','skill-blue-orta-6','skill-blue-uzman-1'],
            'role-social-eng': ['skill-red-temel-6','skill-blue-orta-6'],
            'role-cloud-sec': ['role-soc-analyst', 'skill-blue-temel-5', 'skill-red-orta-4', 'skill-blue-uzman-5','skill-red-uzman-4'],
            'role-bas-specialist': ['role-pentester', 'skill-blue-orta-5'],
            'role-architect': ['role-cloud-sec', 'skill-blue-uzman-1', 'skill-red-uzman-1'],
            'role-redteam-op': ['role-pentester', 'skill-red-uzman-1','skill-red-uzman-2'],
            'role-exploit-dev': ['role-jr-pentester', 'skill-blue-temel-3', 'skill-red-uzman-3'],
            'role-adv-emulation': ['role-redteam-op', 'role-threat-intel', 'skill-red-uzman-1']
        };

        const coursesData = {
    // =====================================================================================
    // === ATIL SAMANCIOĞLU KURSLARI (İÇERİK ANALİZİYLE YETKİNLİKLER GÜNCELLENDİ) ==========
    // =====================================================================================
    'udemy-atil-python-etik-hacker': {
        id: 'udemy-atil-python-etik-hacker',
        title: 'Python: Sıfırdan İleri Seviyeye - Etik Hacker Örnekleriyle',
        instructor: 'Atıl Samancıoğlu',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/python-sifirdan-ileri-seviyeye/?srsltid=AfmBOoqvkDJRbqLyj2SGnfsVO0gdw_Zp94TkmZLMaRXv2QlA-kz3GUI5',
        level: 'Başlangıç',
        tahmini_sure_saat: 25,
        tahmini_maliyet_usd: 15,
        // Güncelleme: Python temelleri, otomasyon ve ağ programlama yetkinlikleri netleştirildi.
        provides_skills: ['skill-red-temel-5', 'skill-blue-uzman-4']
    },
    'udemy-atil-etik-hacker-olma': {
        id: 'udemy-atil-etik-hacker-olma',
        title: 'Etik Hacker Olma Kursu',
        instructor: 'Atıl Samancıoğlu',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/etik-hacker-olma-kursu/',
        level: 'Orta',
        tahmini_sure_saat: 20,
        tahmini_maliyet_usd: 15,
        // Güncelleme: Kullanıcının belirttiği gibi 'Sosyal Mühendislik' eklendi.
        provides_skills: ['skill-red-orta-1','skill-red-orta-2','skill-red-orta-4','skill-red-orta-5', 'skill-red-temel-6', 'skill-red-temel-1', 'skill-red-temel-4']
    },
    'udemy-atil-seviye2': {
        id: 'udemy-atil-seviye2',
        title: 'Etik Hacker Olma Kursu - Seviye 2: Ağ İçi Saldırılar',
        instructor: 'Atıl Samancıoğlu',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/etik-hacker-olma-kursu-seviye-2-ag-ici-saldirilar/?srsltid=AfmBOorAWmNmKrDcrvKNEkta1zTAy3SMAtrzhHdj031ON1fQBQgWC1Yn',
        level: 'Orta',
        tahmini_sure_saat: 22,
        tahmini_maliyet_usd: 15,
        // Güncelleme: Gelişmiş AD saldırıları ve savunma atlatma konuları eklendi.
        provides_skills: ['skill-red-orta-4', 'skill-red-orta-5', 'skill-red-orta-6', 'skill-red-uzman-2', 'skill-red-uzman-1']
    },
    'udemy-atil-mobil-hacker': {
        id: 'udemy-atil-mobil-hacker',
        title: 'Etik Hacker Olma: Mobil Uygulamalar ve Telefonlar',
        instructor: 'Atıl Samancıoğlu',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/etik-hacker-olmak-mobil-uygulamalar-ve-telefonlar/?srsltid=AfmBOoqz6c_rs1pFpqoc1YIOZX2I8DnKE6t75o7qLGJRnnCRYH_qCyyO',
        level: 'Uzman',
        tahmini_sure_saat: 18,
        tahmini_maliyet_usd: 15,
        // Güncelleme: Mobil sızma testi yetkinliği doğru şekilde eşleştirildi.
        provides_skills: ['skill-red-uzman-5']
    },
    'udemy-atil-bug-bounty': {
        id: 'udemy-atil-bug-bounty',
        title: 'Etik Hacker Olmak: Web Sızma Testleri ve Bug Bounty',
        instructor: 'Atıl Samancıoğlu',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/web-pentesting/?srsltid=AfmBOoqZcpnvuoywPIi1wfhfxOK-gNPrtwmjDCEFSLnZ2sOTRQedo4If',
        level: 'Orta',
        tahmini_sure_saat: 15,
        tahmini_maliyet_usd: 15,
        // Güncelleme: Web teknolojileri temeli, web sızma ve bug bounty yetkinlikleri teyit edildi.
        provides_skills: ['skill-red-temel-4', 'skill-red-orta-1', 'skill-red-orta-3']
    },
    'udemy-atil-veri-bilimi': {
        id: 'udemy-atil-veri-bilimi',
        title: 'Veri Bilimi ve Makina Öğrenmesi 2025: 100 Günlük Kamp',
        instructor: 'Atıl Samancıoğlu',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/yapay-zeka-100-gunluk-kamp/?srsltid=AfmBOoq9ex2p25ze5QqgxPnoQV2mKq3PMXiGtdlotKpxdcx6N0wiJ9FV',
        level: 'Temel',
        tahmini_sure_saat: 35,
        tahmini_maliyet_usd: 15,
        // Güncelleme: Güvenlikte YZ yetkinliği için temel oluşturduğu teyit edildi.
        provides_skills: ['skill-blue-uzman-6']
    },

    // =====================================================================================
    // === DİĞER EĞİTMENLER (İÇERİK ANALİZİYLE YETKİNLİKLER GÜNCELLENDİ) ===================
    // =====================================================================================
    'udemy-mehmet-siber-guvenlik-linux': {
        id: 'udemy-mehmet-siber-guvenlik-linux',
        title: 'Sıfırdan Uygulamalı Siber Güvenlik, Hacking ve Linux Eğitimi',
        instructor: 'Mehmet Yüksel Şekeroğlu',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/sfrdan-siber-guvenlik-ve-linux-egitimi/?srsltid=AfmBOooGcdj2FdGXnY6cKMNvGDpMe-NSz2AJeYYNdKqf2fQ4QCwIWMkE',
        level: 'Başlangıç',
        tahmini_sure_saat: 30,
        tahmini_maliyet_usd: 15,
        // Güncelleme: Linux, Network ve sızma testi temellerini kapsadığı için ilgili yetkinlikler eklendi.
        provides_skills: ['skill-blue-temel-1','skill-blue-temel-2','skill-blue-temel-3','skill-red-temel-1','skill-red-temel-2','skill-red-temel-3', 'skill-red-temel-4']
    },
    'udemy-levent-etik-hacker-2025': {
        id: 'udemy-levent-etik-hacker-2025',
        title: 'Etik Hacker Olma Kursu (Uygulamalı) | 2025',
        instructor: 'Levent Ertunalılar',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/etik-hacker-olma-kursu-uygulamali/?srsltid=AfmBOopNmHwQx9L4PunvdQ21vGO_-DXqImVPsFOLWWUJqbSZqaNIwYKq',
        level: 'Başlangıç',
        tahmini_sure_saat: 50,
        tahmini_maliyet_usd: 15,
        // Güncelleme: Geniş kapsamlı bir başlangıç kursu olduğu için birçok temel seviye yetkinlik eklendi.
        provides_skills: ['skill-blue-temel-1','skill-blue-temel-2','skill-blue-temel-3', 'skill-red-temel-1','skill-red-temel-2','skill-red-temel-4','skill-red-orta-1','skill-red-temel-6']
    },
    'udemy-ibrahim-analist': {
        id: 'udemy-ibrahim-analist',
        title: 'Sıfırdan Uygulamalı Siber Güvenlik Analistliğine Giriş',
        instructor: 'İbrahim Efe Mete Zor',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/siber-guvenlik-analist-olma-kursu/?srsltid=AfmBOoopav7WQD0fea7ckAmzIu3EIme-kgDlaJ4K8TIvv0P_9wRDq6PU',
        level: 'Başlangıç',
        tahmini_sure_saat: 10,
        tahmini_maliyet_usd: 15,
        // Güncelleme: SOC operasyonları ve analiz temellerini kapsadığı için ilgili yetkinlikler eklendi.
        provides_skills: ['skill-blue-temel-1', 'skill-blue-temel-4', 'skill-blue-orta-1', 'skill-blue-orta-2']
    },
    'tcm-practical-ethical-hacking': {
        id: 'tcm-practical-ethical-hacking',
        title: 'Practical Ethical Hacking - The Complete Course',
        instructor: 'Heath Adams (TCM Security)',
        platform: 'TCM Security',
        url: 'https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course',
        level: 'Orta',
        tahmini_sure_saat: 25,
        tahmini_maliyet_usd: 30,
        // Güncelleme: Özellikle ağ içi sızma ve AD temellerini güçlü bir şekilde kapsadığı için ilgili yetkinlikler eklendi.
        provides_skills: ['skill-red-temel-1','skill-red-temel-2','skill-red-orta-4','skill-red-orta-5','skill-red-orta-6', 'skill-red-orta-2']
    },
    'btk-sizma-testi': {
        id: 'btk-sizma-testi',
        title: 'Sızma Testi Eğitimi',
        instructor: 'BTK Akademi',
        platform: 'BTK Akademi',
        url: 'https://www.btkakademi.gov.tr/portal/course/sizma-testi-34000',
        level: 'Orta',
        tahmini_sure_saat: 65,
        tahmini_maliyet_usd: 0,
        // Güncelleme: Kapsamlı içeriği gözden geçirilerek orta seviye yetkinlikler de eklendi.
        provides_skills: ['skill-red-temel-1','skill-red-temel-2','skill-red-temel-4', 'skill-red-orta-1','skill-red-orta-2','skill-red-orta-4', 'skill-red-temel-5', 'skill-blue-temel-3', 'skill-red-orta-6']
    },

    // =====================================================================================
    // === DESTEKLEYİCİ KURSLAR (YETKİNLİK ATAMALARI GÖZDEN GEÇİRİLDİ) ========================
    // =====================================================================================
     'udemy-levent-web-gelistirme': {
        id: 'udemy-levent-web-gelistirme',
        title: 'Sıfırdan Web Geliştirme Kursu (Başlangıç)',
        instructor: 'Levent Ertunalılar',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/sfrdan-web-gelistirme-kursu-baslangc/?srsltid=AfmBOorEt_oXeWo0wMBfb1EGkhs9gkx6nnAOgCuJKKWIGv2dU0J4voL6',
        level: 'Temel',
        tahmini_sure_saat: 30,
        tahmini_maliyet_usd: 15,
        provides_skills: ['skill-red-temel-4']
    },
    'udemy-tuncay-bilgisayar-uzmanligi': {
        id: 'udemy-tuncay-bilgisayar-uzmanligi',
        title: 'Sıfırdan Bilgisayar Uzmanlığı Kursu',
        instructor: 'Tuncay Erol',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/sfrdan-bilgisayar-uzmanlg-kursu/?srsltid=AfmBOopwyl8zO9jRHhr8SL0eeU_KSEjnptOggNjaiTp9KLym_vrzQ2cq',
        level: 'Temel',
        tahmini_sure_saat: 20,
        tahmini_maliyet_usd: 15,
        provides_skills: ['skill-blue-temel-3'] // İşletim Sistemi Bilgisi yetkinliğine temel oluşturur
    },
    'udemy-omer-sql': {
        id: 'udemy-omer-sql',
        title: 'Uygulamalarla SQL Öğreniyorum',
        instructor: 'Ömer Çolakoğlu',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/sql-ogreniyorum/?srsltid=AfmBOorxgk9WtpyJH-CO9j6-YO7k-UBWMFucu480jzb-qvRPp7yDDIhe',
        level: 'Temel',
        tahmini_sure_saat: 10,
        tahmini_maliyet_usd: 15,
        // Güncelleme: SQLi yetkinliği için temel oluşturur ancak doğrudan siber güvenlik yetkinliği vermez. Boş bırakmak daha doğru.
        provides_skills: ['skill-red-orta-1']
    },
    'udemy-ilhan-sonicwall': {
        id: 'udemy-ilhan-sonicwall',
        title: 'Sonicwall Firewall Eğitimi',
        instructor: 'İlhan Çiçek',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/sonicwall-firewall-egitimi/?srsltid=AfmBOoprDhpgQB-Xv_NFAANprpXMUF-GDCo3wD1BEr4EYTkV4nL7nM58',
        level: 'Orta',
        tahmini_sure_saat: 5,
        tahmini_maliyet_usd: 15,
        // Güncelleme: Firewall bilgisi 'Güvenlik Araçları' ve 'Ağ Trafiği Analizi' ile ilgilidir.
        provides_skills: ['skill-blue-temel-4', 'skill-blue-orta-3']
    },
     'udemy-parv-dark-web': {
        id: 'udemy-parv-dark-web',
        title: 'Dark Web: Complete Introduction to the Deep/Dark Web 2025',
        instructor: 'Parv Shah',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/dark-web-complete-introduction-to-the-deep_dark-web-2021/?srsltid=AfmBOoo0DFdsxKJpvSEf_6VU8-0nW-0aZOMepI65DfsFKAkB8Unfysv3',
        level: 'Orta',
        tahmini_sure_saat: 2,
        tahmini_maliyet_usd: 15,
        // Güncelleme: CTI ve OSINT konularıyla ilişkili olduğu için 'Tehdit İstihbaratı' yetkinliği eklendi.
        provides_skills: ['skill-blue-orta-6', 'skill-red-temel-6']
    },
    'udemy-yasi-pentest': {
        id: 'udemy-yasin-pentest',
        title: 'Uygulamalı Pentest ve Güvenlik Uzmanlığı Eğitimi',
        instructor: 'Yasin Toyga',
        platform: 'Udemy',
        url: 'https://www.udemy.com/course/sfrdan-uygulamal-szma-ve-pentest-egitimi-2025/?srsltid=AfmBOooNTnz1uwlXyxgb3qrdCrb_DNvbevlgv_Ny-wEO7HjBRv1ZKpWv',
        level: 'Orta',
        tahmini_sure_saat: 40,
        tahmini_maliyet_usd: 15,
        // Güncelleme: İçerik analiziyle orta seviye yetkinlikler teyit edildi.
        provides_skills: ['skill-red-orta-1', 'skill-red-orta-2', 'skill-red-orta-4', 'skill-red-orta-5', 'skill-red-orta-6']
    },
    'btk-ag-temelleri': {
        id: 'btk-ag-temelleri',
        title: 'Temel Ağ Teknolojileri',
        instructor: 'BTK Akademi',
        platform: 'BTK Akademi',
        url: 'https://www.btkakademi.gov.tr/portal/course/temel-ag-teknolojileri-14711',
        level: 'Başlangıç',
        tahmini_sure_saat: 10,
        tahmini_maliyet_usd: 0,
        provides_skills: ['skill-blue-temel-2']
    },
    'btk-linux': {
        id: 'btk-linux',
        title: 'Kali Linux Eğitimi',
        instructor: 'BTK Akademi',
        platform: 'BTK Akademi',
        url: 'hhttps://www.btkakademi.gov.tr/portal/course/kali-linux-25706',
        level: 'Başlangıç',
        tahmini_sure_saat: 20,
        tahmini_maliyet_usd: 0,
        provides_skills: ['skill-blue-temel-3']
    }
};

        const skillToCoursesMap = {};
    for (const courseId in coursesData) {
        const course = coursesData[courseId];
        if (course.provides_skills) {
            course.provides_skills.forEach(skillId => {
                // Eğer bu yetkinlik için haritada henüz bir giriş yoksa, boş bir dizi oluştur.
                if (!skillToCoursesMap[skillId]) {
                    skillToCoursesMap[skillId] = [];
                }
                // Kurs objesini (sadece adını değil, tüm bilgilerini) diziye ekle.
                skillToCoursesMap[skillId].push(course);
            });
        }
    }

    // 2. Adım: Sayfadaki tüm yetkinlik kartlarını (flip-card) bulun.
    // Kartın arka yüzünü hedefleyerek, ilgili tüm kursları bir liste formatında ekleyin.
    document.querySelectorAll('.flip-card').forEach(card => {
        const skillId = card.id;
        const courses = skillToCoursesMap[skillId];

        // Eğer bu yetkinlik için bir veya daha fazla kurs bulunduysa...
        if (courses && courses.length > 0) {
            const cardBack = card.querySelector('.flip-card-back');
            if (cardBack) {
                // Kurslar için genel bir kapsayıcı div oluşturun.
                const coursesContainer = document.createElement('div');
                coursesContainer.className = 'related-courses-container';

                // Kurs listesini tutacak bir başlık ve ul elementi oluşturun.
                let coursesHTML = '<h6 class="font-bold text-slate-700 mb-2 mt-3 border-t pt-2">İlgili Kurslar</h6><ul class="space-y-1">';

                // Her bir kursu liste elemanı (li) olarak ekleyin ve Udemy linkini verin.
                courses.forEach(course => {
                    coursesHTML += `
                        <li class="text-xs">
                            <a href="${course.url}" target="_blank" class="text-sky-700 hover:underline">
                                ${course.title}
                            </a>
                        </li>
                    `;
                });

                coursesHTML += '</ul>';
                coursesContainer.innerHTML = coursesHTML;
                
                // Oluşturulan listeyi kartın arka yüzünün en sonuna ekleyin.
                cardBack.appendChild(coursesContainer);
            }
        }
    });
    
        const COMPLETED_COURSES_KEY = 'completedCourses';

        // Arayüz Elementleri
        const courseSelector = document.getElementById('course-selector');
        const courseDetails = document.getElementById('course-details');
        const addCourseBtn = document.getElementById('add-course-btn');
        const completedCoursesList = document.getElementById('completed-courses-list');
        const noCompletedCourseMsg = document.getElementById('no-completed-course');
        
        // Başlangıç durumu
        let userCompletedCourses = JSON.parse(localStorage.getItem(COMPLETED_COURSES_KEY)) || [];

        // Kurs seçiciyi doldur
        function populateCourseSelector() {
            Object.values(coursesData).sort((a, b) => a.title.localeCompare(b.title)).forEach(course => {
                const option = document.createElement('option');
                option.value = course.id;
                option.textContent = `${course.title} (${course.instructor})`;
                courseSelector.appendChild(option);
            });
        }

        // Seçilen kursun detaylarını göster
        function displayCourseDetails(courseId) {
            if (!courseId) {
                courseDetails.innerHTML = '<p class="text-sm text-slate-500">Kurs detayları burada görünecektir.</p>';
                addCourseBtn.disabled = true;
                return;
            }

            const course = coursesData[courseId];
            let skillsHTML = course.provides_skills.map(skillId => {
                const skillCardElement = document.getElementById(skillId);
                if (!skillCardElement) return ''; // Eğer kart bulunamazsa boş geç

                const skillFrontFace = skillCardElement.querySelector('.flip-card-front');
                if (!skillFrontFace) return '';

                // Kartın rengini ve içeriğini al
                const cardClasses = skillFrontFace.className;
                const innerHTML = skillFrontFace.innerHTML;
                
                // Küçük kart için yeni bir stil oluştur
                let cardStyle = 'p-3 rounded-md border text-sm mb-2 shadow-sm';
                if (cardClasses.includes('bg-blue-50') || cardClasses.includes('bg-blue-100') || cardClasses.includes('bg-blue-200')) {
                    cardStyle += ' bg-blue-50 border-blue-200';
                } else if (cardClasses.includes('bg-red-50') || cardClasses.includes('bg-red-100') || cardClasses.includes('bg-red-200')) {
                    cardStyle += ' bg-red-50 border-red-200';
                } else {
                    cardStyle += ' bg-slate-50 border-slate-200';
                }

                return `<div class="${cardStyle}">${innerHTML}</div>`;
            }).join('');

            courseDetails.innerHTML = `
                <h4 class="font-bold text-sm text-slate-800">${course.title}</h4>
                <p class="text-xs text-slate-500 mb-3">Eğitmen: ${course.instructor}</p>
                <strong class="text-xs font-semibold block mb-2">Bu Kurs ile Kazanılacak Yetkinlikler:</strong>
                <div class="space-y-2 max-h-64 overflow-y-auto pr-2">${skillsHTML || '<p class="text-xs text-slate-400">Bu kurs için tanımlanmış bir yetkinlik bulunmuyor.</p>'}</div>
            `;
            addCourseBtn.disabled = userCompletedCourses.includes(courseId);
        }

        // Tamamlanan kurslar listesini ekranda güncelle
        function renderCompletedCourses() {
            completedCoursesList.innerHTML = '';
            if (userCompletedCourses.length === 0) {
                noCompletedCourseMsg.style.display = 'block';
            } else {
                noCompletedCourseMsg.style.display = 'none';
                userCompletedCourses.forEach(courseId => {
                    const course = coursesData[courseId];
                    const li = document.createElement('li');
                    li.className = 'flex items-center justify-between bg-white p-3 rounded-md border border-slate-200 shadow-sm';
                    li.innerHTML = `
                        <div>
                            <p class="font-semibold text-sm text-sky-700">${course.title}</p>
                            <p class="text-xs text-slate-500">${course.instructor}</p>
                        </div>
                        <button data-course-id="${course.id}" class="remove-course-btn text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors">Kaldır</button>
                    `;
                    completedCoursesList.appendChild(li);
                });
            }
        }
        
        // Sistemi (Kariyer Motoru ve Yetkinlik Kartları) güncelle
        function updateSystem() {
            let allSkillsFromCourses = new Set();
            userCompletedCourses.forEach(courseId => {
                coursesData[courseId].provides_skills.forEach(skillId => {
                    allSkillsFromCourses.add(skillId);
                });
            });

            const userPersonalSkills = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            const combinedSkills = [...new Set([...userPersonalSkills, ...Array.from(allSkillsFromCourses)])];
            
            // Ana yetkinlik listesini güncelle. ÖNEMLİ: Bu, kurslardan gelen yetkinlikleri kalıcı hale getirir.
            // Eğer sadece o anlık bir hesaplama isteniyorsa bu satır değiştirilebilir. Şimdilik kalıcı yapıyoruz.
            localStorage.setItem(STORAGE_KEY, JSON.stringify(combinedSkills));
            
            // Tüm yetkinlik kartlarının ve kariyer motorunun durumunu yeniden yükle
            loadSkillsState(); // Bu fonksiyon zaten vardı, yeniden kullanıyoruz.
            
            // Eğer kariyer motoru sonucu ekranda ise, "Yol Haritamı Oluştur" butonuna basılmış gibi yeniden tetikle
            if(document.getElementById('roadmap-output').innerHTML.trim() !== '') {
                generateBtn.click();
            }
        }
        
        // --- Olay Dinleyicileri ---

        // Kurs seçildiğinde
        courseSelector.addEventListener('change', () => {
            displayCourseDetails(courseSelector.value);
        });

        // Kurs tamalandı olarak işaretlendiğinde
        addCourseBtn.addEventListener('click', () => {
            const selectedCourseId = courseSelector.value;
            if (selectedCourseId && !userCompletedCourses.includes(selectedCourseId)) {
                userCompletedCourses.push(selectedCourseId);
                localStorage.setItem(COMPLETED_COURSES_KEY, JSON.stringify(userCompletedCourses));
                addCourseBtn.disabled = true;
                renderCompletedCourses();
                updateSystem();
            }
        });

        // Tamamlanan bir kursu listeden kaldırdığında
        completedCoursesList.addEventListener('click', (e) => {
            if (e.target && e.target.classList.contains('remove-course-btn')) {
                const courseIdToRemove = e.target.getAttribute('data-course-id');
                userCompletedCourses = userCompletedCourses.filter(id => id !== courseIdToRemove);
                localStorage.setItem(COMPLETED_COURSES_KEY, JSON.stringify(userCompletedCourses));
                
                // Seçili kurs kaldırılan kurs ise, ekle butonunu tekrar aktif et
                if(courseSelector.value === courseIdToRemove) {
                    addCourseBtn.disabled = false;
                }
                
                renderCompletedCourses();
                updateSystem();
            }
        });

        // Sayfa yüklendiğinde ilk durumu hazırla
        populateCourseSelector();
        renderCompletedCourses();

        // --- AKILLI MOTORUN ÇALIŞTIRILMASI (YENİ VE KÜMÜLATİF MANTIK) ---
        const startRoleSelector = document.getElementById('start-role-selector');
        const targetRoleSelector = document.getElementById('target-role-selector');
        const generateBtn = document.getElementById('generate-roadmap-btn');
        const roadmapOutput = document.getElementById('roadmap-output');

        const rolesForSelector = [
            { id: 'role-soc-analyst', name: 'Giriş Seviyesi: SOC Analisti' },
            { id: 'role-infosec-grc', name: 'Giriş Seviyesi: Bilgi Güvenliği Uzman Yrd.' },
            { id: 'role-jr-pentester', name: 'Giriş Seviyesi: Junior Sızma Testi Uzmanı' },
            { id: 'role-product-specialist', name: 'Giriş Seviyesi: Güvenlik Ürün Uzmanı' },
            { id: 'role-pentester', name: 'Orta Seviye: Sızma Testi Uzmanı' },
            { id: 'role-appsec', name: 'Orta Seviye: Uygulama Güvenliği Uzmanı' },
            { id: 'role-dfir', name: 'Orta Seviye: DFIR Uzmanı' },
            { id: 'role-detection-eng', name: 'Orta Seviye: Tespit Mühendisi' },
            { id: 'role-threat-intel', name: 'Orta Seviye: Tehdit İstihbaratı Analisti' },
            { id: 'role-social-eng', name: 'Orta Seviye: Sosyal Mühendislik Uzmanı' },
            { id: 'role-cloud-sec', name: 'Orta/İleri Seviye: Bulut Güvenliği Müh.' },
            { id: 'role-bas-specialist', name: 'Orta/İleri Seviye: BAS Uzmanı' },
            { id: 'role-architect', name: 'İleri Seviye: Güvenlik Mimarı' },
            { id: 'role-redteam-op', name: 'İleri Seviye: Kırmızı Takım Operatörü' },
            { id: 'role-exploit-dev', name: 'İleri Seviye: Exploit Geliştirici' },
            { id: 'role-adv-emulation', name: 'İleri Seviye: Adversary Emulation Lideri' },
        ];

        const startOptionDefault = document.createElement('option');
        startOptionDefault.value = 'yeni-mezun';
        startOptionDefault.textContent = 'Yeni Mezun / Başlangıç';
        startRoleSelector.appendChild(startOptionDefault);
        rolesForSelector.forEach(role => {
            const option = document.createElement('option');
            option.value = role.id;
            option.textContent = role.name;
            startRoleSelector.appendChild(option);
        });

        rolesForSelector.forEach(role => {
            const option = document.createElement('option');
            option.value = role.id;
            option.textContent = role.name;
            targetRoleSelector.appendChild(option);
        });

        // YENİ YARDIMCI FONKSİYON: Bir rolün tüm alt yetkinliklerini kümülatif olarak toplar.
        function getCumulativeSkills(roleId, processedRoles = new Set()) {
            if (processedRoles.has(roleId) || !roleToSkillsMap[roleId]) {
                return new Set();
            }
            processedRoles.add(roleId);

            const directEntries = roleToSkillsMap[roleId];
            let cumulativeSkills = new Set();

            directEntries.forEach(entry => {
                if (entry.startsWith('skill-')) {
                    cumulativeSkills.add(entry);
                } else if (entry.startsWith('role-')) {
                    const subRoleSkills = getCumulativeSkills(entry, processedRoles);
                    subRoleSkills.forEach(skill => cumulativeSkills.add(skill));
                }
            });
            return cumulativeSkills;
        }

        generateBtn.addEventListener('click', () => {
            const startRoleId = startRoleSelector.value;
            const targetRoleId = targetRoleSelector.value;
            
            const targetSkills = Array.from(getCumulativeSkills(targetRoleId));
            const userPersonalSkills = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
            const startRoleSkills = (startRoleId === 'yeni-mezun') ? [] : Array.from(getCumulativeSkills(startRoleId));
            const userHasSkills = [...new Set([...userPersonalSkills, ...startRoleSkills])];

            roadmapOutput.innerHTML = '';
            document.querySelectorAll('.flip-card').forEach(c => c.classList.remove('ring-4', 'ring-purple-500', 'ring-offset-2'));

            if (targetSkills.length === 0) {
                roadmapOutput.innerHTML = '<p class="text-red-500">Lütfen geçerli bir hedef rol seçin.</p>'; return;
            }

            let totalPoints = 0;
            let userPoints = 0;
            const missingSkills = [];

            targetSkills.forEach(skillId => {
                if (skillsData[skillId]) {
                    totalPoints += skillsData[skillId].points;
                    if (userHasSkills.includes(skillId)) { userPoints += skillsData[skillId].points; } else { missingSkills.push(skillId); }
                }
            });

            let nextSkillToLearnId = null;
            if (missingSkills.length > 0) {
                const learnableSkills = missingSkills.filter(skillId => {
                    const prereqs = skillsData[skillId].prerequisites;
                    return prereqs.every(prereqId => userHasSkills.includes(prereqId));
                });
                if (learnableSkills.length > 0) {
                    learnableSkills.sort((a, b) => skillsData[a].points - skillsData[b].points);
                    nextSkillToLearnId = learnableSkills[0];
                } else {
                    const firstMissingPrereq = missingSkills.flatMap(skillId => skillsData[skillId].prerequisites).find(p => !userHasSkills.includes(p));
                    nextSkillToLearnId = firstMissingPrereq;
                }
            }
            
            const readinessPercentage = totalPoints > 0 ? (userPoints / totalPoints) * 100 : 0;
            let outputHTML = `<div class="bg-white p-6 rounded-lg shadow-lg border border-slate-200"><h4 class="text-lg font-bold text-slate-800 mb-2">Hedefine Olan Yakınlığın</h4><div class="w-full bg-slate-200 rounded-full h-6"><div class="bg-sky-600 h-6 rounded-full text-center text-white text-sm flex items-center justify-center transition-all duration-500" style="width: ${readinessPercentage.toFixed(2)}%;">${readinessPercentage > 10 ? '%' + readinessPercentage.toFixed(1) : ''}</div></div><p class="text-right text-sm font-semibold text-slate-600 mt-1">${userPoints} / ${totalPoints} Puan</p>`;
            
            if (nextSkillToLearnId && skillsData[nextSkillToLearnId]) {
                const nextSkill = skillsData[nextSkillToLearnId];
                outputHTML += `<div class="mt-4 p-4 bg-purple-100 border-l-4 border-purple-500 rounded-r-lg"><h5 class="font-bold text-purple-800">💡 Akıllı Öneri: Sıradaki Adım</h5><p class="text-sm text-purple-700 mt-1">Bu patikada ilerlemek için odaklanman gereken en mantıklı yetkinlik: <a href="#${nextSkillToLearnId}" class="font-bold underline hover:text-purple-900">${nextSkill.name}</a>.</p></div>`;
            } else if (missingSkills.length === 0) {
                 outputHTML += `<div class="mt-4 p-4 bg-green-100 border-l-4 border-green-500 rounded-r-lg"><h5 class="font-bold text-green-800">🎉 Tebrikler!</h5><p class="text-sm text-green-700 mt-1">Seçtiğiniz hedef rol için gereken tüm yetkinliklere sahipsiniz!</p></div>`;
            }

            outputHTML += `<hr class="my-4"><h4 class="text-lg font-bold text-slate-800 mb-3">Hedef İçin Gereken Yetkinlikler</h4><ul class="space-y-2">`;
            const sortedTargetSkills = targetSkills.sort((a,b) => skillsData[a].points - skillsData[b].points);
            sortedTargetSkills.forEach(skillId => {
                 if (skillsData[skillId]) {
                    const skill = skillsData[skillId];
                    const isCompleted = userHasSkills.includes(skillId);
                    outputHTML += `<li class="flex items-center text-sm ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-700'}"><span class="mr-2">${isCompleted ? '✅' : '❌'}</span><span><strong>[${skill.level.charAt(0).toUpperCase()}]</strong> ${skill.name}</span></li>`;
                 }
            });
            outputHTML += '</ul></div>';
            roadmapOutput.innerHTML = outputHTML;

            targetSkills.forEach(skillId => {
                const cardElement = document.getElementById(skillId);
                if (cardElement && !userHasSkills.includes(skillId)) {
                    cardElement.classList.add('ring-4', 'ring-purple-500', 'ring-offset-2');
                }
            });
        });

    const radarChartData = {
        labels: [
            'Teorik Bilgi',
            'Pratik Yetkinlik',
            'Sertifikasyon',
            'Portföy Kanıtı',
            'Ağ & Topluluk'
        ],
        datasets: [{
            label: 'Genel Aday',
            data: [6, 3, 2, 2, 3],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
            label: 'Sıra Dışı Aday',
            data: [8, 9, 8, 9, 8],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }]
    };

    const radarCtx = document.getElementById('profileRadarChart').getContext('2d');
    new Chart(radarCtx, {
        type: 'radar',
        data: radarChartData,
        options: {
            maintainAspectRatio: false,
            elements: {
                line: {
                    borderWidth: 3
                }
            },
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 12,
                            weight: 'bold'
                        },
                        color: '#334155'
                    },
                    ticks: {
                        color: '#64748b',
                        backdropColor: 'rgba(255, 255, 255, 0.75)',
                        stepSize: 2
                    },
                    suggestedMin: 0,
                    suggestedMax: 10
                }
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.r !== null) {
                                label += context.parsed.r + ' / 10';
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    const certsData = {
        labels: ['CompTIA Security+', 'CEH', 'TSE Sızma Testi Uzmanı', 'OSCP'],
        datasets: [{
            label: 'Türkiye Pazarındaki Değeri (1-10)',
            data: [6, 7.5, 8, 9.5],
            backgroundColor: [
                'rgba(14, 165, 233, 0.6)',
                'rgba(234, 179, 8, 0.6)',
                'rgba(220, 38, 38, 0.6)',
                'rgba(34, 197, 94, 0.6)'
            ],
            borderColor: [
                'rgba(14, 165, 233, 1)',
                'rgba(234, 179, 8, 1)',
                'rgba(220, 38, 38, 1)',
                'rgba(34, 197, 94, 1)'
            ],
            borderWidth: 1
        }]
    };
    
    const certsDetailsData = [
        { title: 'CompTIA Security+', text: 'Alana yeni girenler için temel teorik bilgiyi kanıtlayan, uluslararası kabul görmüş, saygın bir başlangıç sertifikasıdır. Satıcıdan bağımsızdır.' },
        { title: 'Certified Ethical Hacker (CEH)', text: 'Türkiye\'de yüksek marka bilinirliğine sahiptir ve İK filtrelerinde sıkça aranır. Ofansif güvenliğe olan ilgiyi gösteren popüler bir sertifikadır.' },
        { title: 'TSE Sızma Testi Uzmanı', text: 'Özellikle BDDK, EPDK gibi kurumların denetlediği düzenlemeye tabi sektörlerde (bankacılık, enerji) kritik ve bazen zorunlu bir yetkinlik belgesidir.' },
        { title: 'OSCP', text: 'Sektördeki en prestijli ofansif güvenlik sertifikasıdır. 24 saatlik uygulamalı sınavıyla pratik becerinin nihai kanıtıdır ve adayı anında elit kategoriye taşır.' }
    ];

    const barCtx = document.getElementById('certsBarChart').getContext('2d');
    const certsBarChart = new Chart(barCtx, {
        type: 'bar',
        data: certsData,
        options: {
            indexAxis: 'y',
            maintainAspectRatio: false,
            scales: {
                x: {
                    beginAtZero: true,
                    suggestedMax: 10
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const details = certsDetailsData[index];
                    const detailsDiv = document.getElementById('cert-details');
                    detailsDiv.innerHTML = `<h5 class="font-bold text-slate-800">${details.title}</h5><p class="text-slate-600 mt-1">${details.text}</p>`;
                    detailsDiv.classList.remove('hidden');
                }
            }
        }
    });

    const skillToggle = document.getElementById('skillToggle');
    const offensiveSkills = document.getElementById('offensive-skills');
    const defensiveSkills = document.getElementById('defensive-skills');
    
    skillToggle.addEventListener('change', () => {
        offensiveSkills.classList.toggle('hidden');
        defensiveSkills.classList.toggle('hidden');
    });

    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(item => {
                item.classList.remove('text-sky-600', 'border-sky-500');
                item.classList.add('text-slate-500', 'hover:text-slate-700', 'hover:border-slate-300', 'border-transparent');
            });
            tab.classList.add('text-sky-600', 'border-sky-500');
            tab.classList.remove('text-slate-500', 'hover:text-slate-700', 'hover:border-slate-300', 'border-transparent');

            const targetId = tab.id.replace('tab-', 'content-');
            contents.forEach(content => {
                if(content.id === targetId) {
                    content.classList.remove('hidden');
                } else {
                    content.classList.add('hidden');
                }
            });
        });
    });
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const navLink = document.querySelector(`a.nav-link[href="#${entry.target.id}"]`);
                if (navLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
    const STORAGE_KEY = 'completedSkills';
        let completedSkills = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

        const skillCards = document.querySelectorAll('.flip-card');

        // Mevcut durumu localStorage'dan yükle
        const loadSkillsState = () => {
            skillCards.forEach(card => {
                if (completedSkills.includes(card.id)) {
                    card.classList.add('skill-complete');
                    card.classList.remove('skill-incomplete');
                } else {
                    card.classList.add('skill-incomplete');
                    card.classList.remove('skill-complete');
                }
            });
        };
        
        skillCards.forEach(card => {
            const cardInner = card.querySelector('.flip-card-inner');
            const btnAdd = card.querySelector('.btn-add');
            const btnRemove = card.querySelector('.btn-remove');

            // KART ÇEVİRME MANTIĞI (DÜZELTİLMİŞ VE STABİL HALE GETİRİLMİŞ)
            if (cardInner) {
                cardInner.addEventListener('click', (event) => {
                    // Eğer tıklanan element veya onun üst elementi bir 'skill-btn' (yani +/- butonu) ise,
                    // kartı çevirme işlemini yapma. Bu, butonların kendi görevlerini yapmasını sağlar.
                    if (event.target.closest('.skill-btn')) {
                        return;
                    }
                    // Aksi takdirde, kartın dönme durumunu değiştir.
                    card.classList.toggle('is-flipped');
                });
            }

            // '+' butonuna tıklanınca yetkinliği ekle
            if (btnAdd) {
                btnAdd.addEventListener('click', () => {
                    if (!completedSkills.includes(card.id)) {
                        completedSkills.push(card.id);
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSkills));
                        loadSkillsState();
                    }
                });
            }

            // '-' butonuna tıklanınca yetkinliği kaldır
            if (btnRemove) {
                btnRemove.addEventListener('click', () => {
                    completedSkills = completedSkills.filter(id => id !== card.id);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedSkills));
                    loadSkillsState();
                });
            }
        });

        // Sayfa yüklendiğinde durumu uygula
        loadSkillsState();
    const statsDonutCtx = document.getElementById('statsDonutChart').getContext('2d');
    new Chart(statsDonutCtx, {
        type: 'doughnut',
        data: {
            labels: [
                'Güvenlik Operasyonları (SOC)',
                'Sızma Testi ve Ofansif Güvenlik',
                'Bilgi Güvenliği ve Uyum (GRC)',
                'Diğer (Ağ, Bulut vb.)'
            ],
            datasets: [{
                label: 'Yeni Mezun Başlangıç Rolleri Dağılımı',
                data: [65, 15, 10, 10],
                backgroundColor: [
                    '#0ea5e9', // sky-500
                    '#ef4444', // red-500
                    '#8b5cf6', // violet-500
                    '#64748b'  // slate-500
                ],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Türkiye Piyasasında Yeni Mezunların İşe Alım Oranları (Tahmini)',
                    padding: {
                        top: 10,
                        bottom: 10
                    }
                }
            }
        }
    });

});
