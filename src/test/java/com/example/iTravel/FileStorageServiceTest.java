package com.example.iTravel;

import com.example.iTravel.service.FileStorageService;
import com.mongodb.client.gridfs.model.GridFSFile;
import org.bson.types.ObjectId;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.gridfs.GridFsTemplate;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@SpringBootTest
public class FileStorageServiceTest {

    @InjectMocks
    private FileStorageService fileStorageService;

    @Mock
    private GridFsTemplate gridFsTemplate;

    public FileStorageServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testAddFile() throws IOException {
        // Prepare a mock file
        MultipartFile mockFile = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                "Hello World".getBytes()
        );

        // Mock the behavior of gridFsTemplate
        ObjectId mockObjectId = new ObjectId();
        when(gridFsTemplate.store(any(), anyString(), anyString())).thenReturn(mockObjectId);

        // Call the method to be tested
        String fileId = fileStorageService.addFile(mockFile);

        // Verify the behavior
        assertNotNull(fileId);
        assertEquals(mockObjectId.toString(), fileId);

        // Verify that the method store was called exactly once with the correct parameters
        verify(gridFsTemplate, times(1)).store(any(), eq("test.txt"), eq("text/plain"));
    }

    @Test
    public void testAddFile_GridFsTemplateIsNull() {
        // Set the gridFsTemplate to null
        fileStorageService = new FileStorageService();

        // Prepare a mock file
        MultipartFile mockFile = new MockMultipartFile(
                "file",
                "test.txt",
                "text/plain",
                "Hello World".getBytes()
        );

        Exception exception = assertThrows(IllegalStateException.class, () -> {
            fileStorageService.addFile(mockFile);
        });

        String expectedMessage = "GridFsTemplate is null";
        String actualMessage = exception.getMessage();

        assertTrue(actualMessage.contains(expectedMessage));
    }
}
