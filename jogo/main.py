import pygame; from pygame.locals import *; from sys import exit

pygame.init()

dimensoes = (640, 480)

tela = pygame.display

screen = tela.set_mode(dimensoes)

tela.set_caption("juguito")

x, y = 400, 300

while True:
    pygame.time.Clock().tick(30)
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            exit()
    
    screen.fill((0, 0, 0))
    
    if pygame.key.get_pressed()[K_a]:
        x -= 10
    if pygame.key.get_pressed()[K_d]:
        x += 10
    if pygame.key.get_pressed()[K_w]:
        y -= 10
    if pygame.key.get_pressed()[K_s]:
        y += 10
        
        
        
    if y == 480 and pygame.key.get_pressed()[K_s]:
        y = -40    
    if x == 640 and pygame.key.get_pressed()[K_d]:
        x = -40
    if x == -40 and pygame.key.get_pressed()[K_a]:
        x = 640
    if y == -40 and pygame.key.get_pressed()[K_w]:
        y = 480
                    
    pygame.draw.rect(screen, (200, 0, 250), (x, y, 40, 40))
    
        
    
    
    tela.update()