import pygame; from pygame.locals import *; from sys import exit

pygame.init()

dimensoes = (640, 480)

tela = pygame.display

screen = tela.set_mode(dimensoes)

tela.set_caption("juguito")

class Personagem():
    def __init__(self, tamX=30, tamY=30, cor=(200, 0, 250)):
        self.pos = [305, 210]
        self.cor = cor
        self.tamanho = (tamX, tamY)
        self.info = (self.pos, self.tamanho)
        self.vel = 15
        
    def movimentar(self):
        #movimentação em casos normais
        if pygame.key.get_pressed()[K_a]:
            self.pos[0] -= self.vel
        if pygame.key.get_pressed()[K_d]:
            self.pos[0] += self.vel
        if pygame.key.get_pressed()[K_w]:
            self.pos[1] -= self.vel
        if pygame.key.get_pressed()[K_s]:
            self.pos[1] += self.vel
            
        #movimentação em casos especiais (passando da borda)
        if self.pos[1] >= 480 and pygame.key.get_pressed()[K_s]:
            self.pos[1] = -40    
        if self.pos[0] >= 640 and pygame.key.get_pressed()[K_d]:
            self.pos[0] = -40
        if self.pos[0] <= -40 and pygame.key.get_pressed()[K_a]:
            self.pos[0] = 640
        if self.pos[1] <= -40 and pygame.key.get_pressed()[K_w]:
            self.pos[1] = 480
    
    def aparecer(self):
        pygame.draw.rect(screen, self.cor, self.info)
           
class Tela():
    def __init__():
        pass  
    
                

pedro = Personagem(35, 35)

while True:    
    pygame.time.Clock().tick(30)
    
    for event in pygame.event.get():
        if event.type == QUIT:
            pygame.quit()
            exit()
    
    screen.fill((0, 0, 0))
    
    
    pedro.movimentar()  
        
    pedro.aparecer()    
    
    tela.update()