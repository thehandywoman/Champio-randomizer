package pl.wsei.lublin.apptesting.testingweb5;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class PersonTest {

    @Test
    public void test_person_default_constructor() {
        Person testClass = new Person();

        testClass.setmName("Maria");
        assertEquals("Maria", testClass.getmName());

        testClass.setfName("Jan");
        assertEquals("Jan", testClass.getfName());

        testClass.setlName("Rokita");
        assertEquals("Rokita", testClass.getlName());
    }
}