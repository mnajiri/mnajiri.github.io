
let currentSection = 0;

document.addEventListener('wheel', function(event) {
    // تجنب التمرير الزائد
    if (new Date() - (window.lastScrollTime || 0) < 600) {
        return;
    }

    // تحديد اتجاه التمرير
    const delta = Math.sign(event.deltaY);

    // تحديث القسم الحالي بناءً على اتجاه التمرير
    currentSection = Math.min(Math.max(currentSection - delta, 0), document.querySelectorAll('.section').length - 1);

    // التمرير إلى القسم الجديد
    document.querySelector('.section:nth-child(' + (currentSection + 1) + ')').scrollIntoView({ behavior: 'smooth' });

    // تحديث الوقت لمنع التمرير الزائد
    window.lastScrollTime = new Date();
});




      let texts = ["Hi, I’m mnajiri", "I’m interested in js", "I’m currently learning nodejs", "I’m looking to collaborate on AI", "You can find me on social media facebook or IG"];
      let output = document.getElementById('output');
      let textIndex = 0;
  
      function typeAndDeleteEffect() {
        if (textIndex < texts.length) {
          let currentText = texts[textIndex];
  
          // تأثير الكتابة
          output.innerHTML = '';
          let i = 0;
          let typingInterval = setInterval(function() {
            output.innerHTML += currentText[i];
            i++;
  
            if (i === currentText.length) {
              clearInterval(typingInterval);
  
              // تأثير الحذف
              setTimeout(function() {
                let deletingInterval = setInterval(function() {
                  output.innerHTML = output.innerHTML.slice(0, -1);
                  if (output.innerHTML === '') {
                    clearInterval(deletingInterval);
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(typeAndDeleteEffect, 500);
                  }
                }, 100);
              }, 1000);
            }
          }, 100);
        }
      }
  
      // بداية التأثير
      typeAndDeleteEffect();

// اسم الملف الذي يحتوي على البيانات
const fileName = './files/sm.json';

// العنصر الذي سيحتوي على الروابط
const socialMediaList = document.getElementById('socialMediaList');

// استخدام fetch لجلب محتوى الملف
fetch(fileName)
  .then(response => response.json())
  .then(data => {
    // إنشاء عناصر HTML بناءً على بيانات JSON
    data.social_media.forEach(item => {
      const listItem = document.createElement('div');
      listItem.className = 'sm';
      const truncatedDescription = item.description.slice(0, 100);
      listItem.innerHTML = `
        <div>
          <div class="gc">
            <i class="fab fa-${item.platform.toLowerCase()}"></i>
          </div>
          <div class="poBottom">
            <a href="${item.link}"><h3>${item.platform}</h3></a>
            <p>${truncatedDescription}</p>
          </div>   
        </div>
      `;

      // إضافة وظيفة التوجيه عند النقر
      listItem.onclick = function() {
        window.location.href = item.link;
      };

      socialMediaList.appendChild(listItem);
    });
  })
  .catch(error => console.error('حدث خطأ في قراءة الملف:', error));







