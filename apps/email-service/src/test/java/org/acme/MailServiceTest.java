package org.acme;

import io.quarkus.mailer.Mailer;
import io.quarkus.test.InjectMock;
import io.quarkus.test.junit.QuarkusTest;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import org.acme.mailing.MailDto;
import org.acme.mailing.MailService;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.verify;


@QuarkusTest
public class MailServiceTest {
    @Inject
    @Named("smtp")
    MailService mailService;

    @InjectMock
    Mailer mailerMock;

    @Test
    void testSendEmail() {

        MailDto mailDto = new MailDto();
        mailDto.setTo("test@example.com");
        mailDto.setSubject("test subject");
        mailDto.setTextContent("plain content");
        mailDto.setHtmlContent("<p>html content</p>");

        mailService.execute(mailDto);


    }

}
